import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Adjust the path to your Prisma client

interface PurchaseRequestBody {
  userId: string; 
  cardId: string; 
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
      where: { userId, cardId },
    });

    if (existingPurchase) {
      return NextResponse.json({ message: 'User already owns this card' }, { status: 400 });
    }

    // Fetch the user details and validate the balance
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.coins < card.baseCost) {
      return NextResponse.json({ message: 'Insufficient balance to purchase this card' }, { status: 400 });
    }

    // Deduct the cost and update profit per hour
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        coins: user.coins - card.baseCost,
        profitPerHour: user.profitPerHour + Math.floor(card.baseProfit),
      },
    });

    // Create the card purchase entry at level 1
    const newPurchase = await prisma.cardPurchase.create({
      data: {
        userId,
        cardId,
        level: 1,
      },
    });

    // Calculate values for the next level
    const nextProfitPerHour = Math.floor(card.baseProfit * card.profitIncrease);
    const nextCost = Math.floor(card.baseCost * card.costIncrease);

    return NextResponse.json({
      message: 'Card purchased successfully',
      card: {
        ...card,
        level: newPurchase.level,
        nextCost,
        profitPerHour: Math.floor(card.baseProfit),
        nextProfitPerHour,
        userPurchased: true,
      },
      updatedUser,
    });
  } catch (error) {
    console.error('Error purchasing card:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
