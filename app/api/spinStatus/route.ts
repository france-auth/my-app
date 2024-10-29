// /app/api/spin/status/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Adjust the path to your Prisma client

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
  }

  try {
    // Fetch the user's spin information
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        lastSpinTime: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const now = new Date();
    const lastSpinDate = user.lastSpinTime;

    // If no spin history, allow the user to spin
    if (!lastSpinDate) {
      return NextResponse.json({ canSpin: true });
    }

    // Calculate the next eligible spin time (24 hours after the last spin)
    const nextSpinTime = new Date(lastSpinDate.getTime() + 24 * 60 * 60 * 1000);

    if (now >= nextSpinTime) {
      return NextResponse.json({ canSpin: true });
    }

    // If the user cannot spin yet, return the next spin time
    return NextResponse.json({ 
      canSpin: false, 
      nextSpinTime: nextSpinTime.toISOString() 
    });
  } catch (error) {
    console.error('Error checking spin status:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
