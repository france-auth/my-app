import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; 

// Define the same enum in TypeScript to ensure type safety
enum CardCategory {
  SKILL = 'SKILL',
  BUSINESS = 'BUSINESS',
  SPECIAL = 'SPECIAL',
}

interface Card {
  name: string;
  category: CardCategory; // Use the enum here
  baseProfit: number;
  profitIncrease: number;
  maxLevel: number;
  baseCost: number;
  costIncrease: number;
  requires?: string;
  imagePath: string;
  coinIcon: string;
}

export async function POST(request: NextRequest) {
  try {
    const { cards }: { cards: Card[] } = await request.json();

    if (!Array.isArray(cards) || cards.length === 0) {
      return NextResponse.json(
        { message: "Invalid request. 'cards' should be a non-empty array." },
        { status: 400 }
      );
    }

    const createdCards = await Promise.all(
      cards.map((card) =>
        prisma.card.create({
          data: {
            name: card.name,
            category: card.category,
            baseProfit: card.baseProfit,
            profitIncrease: card.profitIncrease,
            maxLevel: card.maxLevel,
            baseCost: card.baseCost,
            costIncrease: card.costIncrease,
            requires: card.requires,
            imagePath: card.imagePath,
            coinIcon: card.coinIcon,
          },
        })
      )
    );

    return NextResponse.json(createdCards, { status: 201 });
  } catch (error) {
    console.error('Error creating multiple cards:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
