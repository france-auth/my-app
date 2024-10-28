import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Make sure this points to your Prisma client instance

export async function GET(request: NextRequest) {
  console.log(request)
  try {
    const cards = await prisma.card.findMany(); // Fetch all cards from the database
    return NextResponse.json(cards, { status: 200 });
  } catch (error) {
    console.error('Error fetching cards:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
