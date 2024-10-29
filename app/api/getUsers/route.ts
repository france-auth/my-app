import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Adjust the path to your Prisma client

export async function GET(request: NextRequest) {
  try {
    // Fetch all users from the database
    const users = await prisma.user.findMany();

    // Return the list of users with a 200 status
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);

    // Handle any errors with a 500 status
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
