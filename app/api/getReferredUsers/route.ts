import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Adjust the path to your Prisma client

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  try {
    // Step 1: Find the user with the given telegramId
    const user = await prisma.user.findUnique({
      where: { telegramId: userId },
    });

    // If the user is not found, return a 404 error
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Step 2: Fetch all referrals made by the user
    const referrals = await prisma.referral.findMany({
      where: {
        userId: userId, // Use the telegramId directly as the userId in the query
      },
    });

    // Step 3: Fetch the details of each referred user using the referredId
    const referredUsers = await Promise.all(
      referrals.map((referral: any) =>
        prisma.user.findUnique({
          where: {
            id: referral.referredId, // Use the referredId which is the ObjectId
          },
        })
      )
    );

    // Filter out any null values in case a user isn't found
    const validReferredUsers = referredUsers.filter(
      (user) => user !== null
    ) as NonNullable<typeof referredUsers[number]>[];

    // Step 4: Return the list of referred users
    return NextResponse.json({ referredUsers: validReferredUsers });
  } catch (error) {
    console.error('Error fetching referred users:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
