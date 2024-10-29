import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Ensure the path to your Prisma client is correct

interface UpgradeCardRequestBody {
  userId: string;
  cardId: string;
}

export async function POST(request: NextRequest) {
  try {
    const { userId, cardId }: UpgradeCardRequestBody = await request.json();

    // Validate input
    if (!userId || !cardId) {
      return NextResponse.json(
        { message: 'User ID and Card ID are required' },
        { status: 400 }
      );
    }

    // Fetch the card details
    const card = await prisma.card.findUnique({
      where: { id: cardId },
    });

    if (!card) {
      return NextResponse.json({ message: 'Card not found' }, { status: 404 });
    }

    // Fetch the user's card purchase record
    const userCard = await prisma.cardPurchase.findFirst({
      where: { userId, cardId },
    });

    if (!userCard) {
      return NextResponse.json(
        { message: 'User does not own this card' },
        { status: 400 }
      );
    }

    // Check if the card has reached its maximum level
    if (userCard.level >= card.maxLevel) {
      return NextResponse.json(
        { message: 'Card has already reached the maximum level' },
        { status: 400 }
      );
    }

    const nextLevel = userCard.level + 1;
    const upgradeCost = Math.floor(card.baseCost * Math.pow(card.costIncrease, nextLevel - 1));

    // Fetch the user details for balance verification
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.coins < upgradeCost) {
      return NextResponse.json(
        { message: 'Insufficient balance to upgrade this card' },
        { status: 400 }
      );
    }

    // Calculate profit per hour at the current and next levels
    const newProfitPerHour = Math.floor(
      card.baseProfit * Math.pow(card.profitIncrease, nextLevel)
    );

    const nextProfitPerHour = Math.floor(
      card.baseProfit * Math.pow(card.profitIncrease, nextLevel + 1)
    );

    // Deduct the upgrade cost from the user's balance and update profitPerHour
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        coins: user.coins - upgradeCost,
        profitPerHour: user.profitPerHour + newProfitPerHour,
      },
    });

    // Update the card level in the CardPurchase record
    const updatedCardPurchase = await prisma.cardPurchase.update({
      where: { id: userCard.id },
      data: { level: nextLevel },
    });

    const nextCost = Math.floor(
      card.baseCost * Math.pow(card.costIncrease, nextLevel)
    );

    return NextResponse.json(
      {
        message: 'Card upgraded successfully',
        card: {
          ...card,
          level: nextLevel,
          nextCost,
          profitPerHour: newProfitPerHour,
          nextProfitPerHour,
          userPurchased: true,
        },
        updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error upgrading card:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
