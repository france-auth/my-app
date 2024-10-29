import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Ensure this points to your Prisma instance

interface CardPurchase {
  cardId: string;
  level: number;
  userId: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId'); // Extract userId from query parameters

  try {
    // Fetch all cards from the database
    const cards = await prisma.card.findMany();

    // If userId is not provided, return all cards without user-specific details
    if (!userId) {
      return NextResponse.json(cards, { status: 200 });
    }

    // Fetch user's card purchases (if userId is provided)
    const userPurchases = await prisma.cardPurchase.findMany({
      where: {
        userId,
        cardId: { in: cards.map((card: any) => card.id) }, // Match the card IDs
      },
    });

    // Map the user's purchases for quick lookup by cardId
    const purchaseMap: Record<string, CardPurchase> = userPurchases.reduce(
      (acc: any, purchase: any) => {
        acc[purchase.cardId] = purchase;
        return acc;
      },
      {} as Record<string, CardPurchase>
    );

    // Format the cards with user-specific details
    const formattedCards = cards.map((card:any) => {
      const userPurchase = purchaseMap[card.id]; // Find the user's purchase record for this card
      const level = userPurchase ? userPurchase.level : 0;

      return {
        ...card,
        level, // Add the level for frontend use
        userPurchased: !!userPurchase,
        nextCost: Math.floor(card.baseCost * Math.pow(card.costIncrease, level)),
        profitPerHour: Math.floor(
          card.baseProfit * Math.pow(card.profitIncrease, level)
        ),
        nextProfitPerHour: Math.floor(
          card.baseProfit * Math.pow(card.profitIncrease, level + 1)
        ),
      };
    });

    return NextResponse.json(formattedCards, { status: 200 });
  } catch (error) {
    console.error('Error fetching cards:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
