import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Adjust the path to your prisma instance

// POST request to refill user taps
export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json(); // Extract userId from request body

    if (!userId) {
      return NextResponse.json(
        { message: 'User ID is required' },
        { status: 400 }
      );
    }

    // Fetch the user details
    const user = await prisma.user.findUnique({
      where: { telegramId: String(userId) },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    const { lastRefillTime, taps, maxTaps } = user;
    const now = new Date();

    // Calculate the time difference in seconds
    const secondsSinceLastRefill = Math.floor(
      (now.getTime() - new Date(lastRefillTime).getTime()) / 1000
    );

    // Calculate how many taps should be refilled
    const tapsPerSecond = maxTaps / 3600;
    const refilledTaps = Math.min(
      secondsSinceLastRefill * tapsPerSecond,
      maxTaps - taps
    );

    if (refilledTaps > 0) {
      // Update user taps and last refill time
      const updatedUser = await prisma.user.update({
        where: { telegramId: String(userId) },
        data: {
          taps: Math.min(taps + refilledTaps, maxTaps),
          lastRefillTime: now,
        },
      });

      return NextResponse.json(
        {
          message: 'Taps refilled successfully',
          user: updatedUser,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: 'No refill needed',
          user,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Error refilling taps:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
