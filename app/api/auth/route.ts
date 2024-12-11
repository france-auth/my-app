import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import validateInitData from "@/lib/validate";
import { NextRequest, NextResponse } from "next/server";



const telegramToken = process.env.BOT_TOKEN as string;
const jwtSecret = process.env.JWT_SECRET as string;

interface TelegramUser {
  id: number;
  username: string;
  photoUrl: string
}

interface AuthRequestBody {
  initData: string;
  referralCode?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { initData, referralCode }: AuthRequestBody = await request.json();
    const referralId = referralCode || null;

    console.log(initData)

    // Step 1: Verify Telegram initData
    const isValid = validateInitData(initData, telegramToken);
    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid initData" },
        { status: 400 }
      );
    }

    // Step 2: Extract user information from initData
    const parsedData = new URLSearchParams(initData);
    const userDataJson = parsedData.get("user");

    if (!userDataJson) {
      return NextResponse.json(
        { message: "No user data available" },
        { status: 400 }
      );
    }

    const telegramUser: TelegramUser = JSON.parse(userDataJson);
    const telegramId = telegramUser.id.toString();
    const username = telegramUser.username;
    const photoUrl = await getTelegramProfilePhoto(parseFloat(telegramId))

    console.log("phot url", photoUrl)

    // Step 3: Check if the user already exists
    let user = await prisma.user.findUnique({
      where: { telegramId },
    });

    // Step 4: If the user doesn't exist, create or update the user
    if (!user) {
      user = await prisma.user.upsert({
        where: { telegramId },
        update: { username },
        create: {
          telegramId,
          username,
          referredBy: referralId,
          photoUrl
        },
      });

      // Step 5: Handle referral logic if referralId is present
      if (referralId) {
        const referringUser = await prisma.user.findUnique({
          where: { telegramId: referralId },
        });

        if (referringUser) {
          await prisma.referral.create({
            data: {
              userId: referringUser.id,
              referredId: user.id,
            },
          });

          await prisma.user.update({
            where: { telegramId: referralId },
            data: {
              referralCount: { increment: 1 },
              coins: referringUser.coins + 5000
            },
          });


        }
      }
    }

    // Step 6: Assign tasks if the user has none
    const existingUserTasks = await prisma.userTask.findMany({
      where: { userId: user.id },
    });

    if (existingUserTasks.length === 0) {
      const tasks = await prisma.task.findMany();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const userTaskPromises = tasks.map((task: any) =>
        prisma.userTask.create({
          data: {
            userId: user.id,
            taskId: task.id,
            claimed: false,
          },
        })
      );

      await Promise.all(userTaskPromises);
    }

    // Step 7: Create JWT token for the user
    const token = jwt.sign(
      { userId: user.id, telegramId: user.telegramId },
      jwtSecret,
      { expiresIn: "24h" }
    );

    // Step 8: Respond with user info and token
    return NextResponse.json({ token, user });
  } catch (error) {
    console.error("Error during Telegram authentication:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}



async function getTelegramProfilePhoto(userId: number): Promise<string | null> {
  const url = `https://api.telegram.org/bot${telegramToken}/getUserProfilePhotos?user_id=${userId}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.ok && data.result.total_count > 0) {
    const photo = data.result.photos[0][0]; // Get the first photo's smallest size
    const fileId = photo.file_id;

    // Get the file URL
    const fileResponse = await fetch(
      `https://api.telegram.org/bot${telegramToken}/getFile?file_id=${fileId}`
    );
    const fileData = await fileResponse.json();

    if (fileData.ok) {
      const filePath = fileData.result.file_path;
      return `https://api.telegram.org/file/bot${telegramToken}/${filePath}`;
    }
  }
  
  return null; // Return null if no photo is found
}
