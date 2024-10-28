import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json(); // Extract userId from request body

    if (!userId) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    // Fetch the user from the database
    const user = await prisma.user.findUnique({
      where: { telegramId: String(userId) },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const now = new Date();
    const lastCheckIn = user.lastCheckIn ? new Date(user.lastCheckIn) : null;

    // Check if the user has already checked in today
    const hasCheckedInToday =
      lastCheckIn &&
      now.getDate() === lastCheckIn.getDate() &&
      now.getMonth() === lastCheckIn.getMonth() &&
      now.getFullYear() === lastCheckIn.getFullYear();

    if (hasCheckedInToday) {
      return NextResponse.json(
        { message: "You've already checked in today!" },
        { status: 400 }
      );
    }

    // Determine if the streak should reset
    const isStreakReset = lastCheckIn && now.getTime() - lastCheckIn.getTime() > 86400000; // More than 24 hours

    // Calculate the user's new streak
    const newStreak = isStreakReset ? 1 : (user.checkInStreak || 0) + 1;

    // Define rewards based on the streak
    const rewards = [
      100, 120, 150, 180, 200, 220, 250, 280, 300, 350, 380, 520, 550, 1000,
      1100, 1500, 1800, 2500, 3000, 4000,
    ];
    const reward = rewards[Math.min(newStreak - 1, rewards.length - 1)];

    // Update the user's coins, streak, and last check-in date
    const updatedUser = await prisma.user.update({
      where: { telegramId: String(userId) },
      data: {
        coins: user.coins + reward,
        lastCheckIn: now,
        checkInStreak: newStreak,
      },
    });

    return NextResponse.json({
      message: 'Check-in successful!',
      user: updatedUser,
      reward,
    });
  } catch (error) {
    console.error('Error during check-in:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
