import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Adjust the path to your Prisma client

interface PurchaseRequestBody {
  userId: string; // Assuming userId is a string (change it if necessary)
  cardId: string; // Assuming cardId is a string (change it if necessary)
}

export async function POST(request: NextRequest) {
  try {
    const { userId, cardId }: PurchaseRequestBody = await request.json();

    // Validate input
    if (!userId || !cardId) {
      return NextResponse.json({ message: 'User ID and Card ID are required' }, { status: 400 });
    }

    // Fetch the card details
    const card = await prisma.card.findUnique({
      where: { id: cardId },
    });

    if (!card) {
      return NextResponse.json({ message: 'Card not found' }, { status: 404 });
    }

    // Check if the user already owns this card
    const existingPurchase = await prisma.cardPurchase.findFirst({
      where: {
        userId: userId,
        cardId: cardId,
      },
    });

    if (existingPurchase) {
      return NextResponse.json({ message: 'User already owns this card' }, { status: 400 });
    }

    // Calculate initial cost for the card purchase
    const purchaseCost = card.baseCost;

    // Fetch the user details
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.coins < purchaseCost) {
      return NextResponse.json(
        { message: 'Insufficient balance to purchase this card' },
        { status: 400 }
      );
    }

    // Calculate the profit contribution of the card at level 1
    const initialProfitPerHour = Math.floor(card.baseProfit);

    // Deduct the cost from user's balance and update profitPerHour
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        coins: user.coins - purchaseCost,
        profitPerHour: user.profitPerHour + initialProfitPerHour,
      },
    });

    // Create the card purchase entry with level 1
    const newPurchase = await prisma.cardPurchase.create({
      data: {
        userId: userId,
        cardId: cardId,
        level: 1, // Store the actual level of the card purchase
      },
    });

    // Calculate the profit for the next level (level 2)
    const nextProfitPerHour = Math.floor(card.baseProfit * Math.pow(card.profitIncrease, 2 - 1)); // Profit for level 2
    const nextCost = Math.floor(card.baseCost * Math.pow(card.costIncrease, 2 - 1)); // Cost for upgrading to level 2

    return NextResponse.json({
      message: 'Card purchased successfully',
      card: {
        ...card,
        level: newPurchase.level,
        nextCost,
        profitPerHour: initialProfitPerHour,
        nextProfitPerHour,
        userPurchased: true,
      },
      updatedUser,
    });
  } catch (error) {
    console.error('Error purchasing card:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
