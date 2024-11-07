import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface CompleteTaskRequestBody {
  userId: string;
  taskId: string;
}

// Handler for completing and claiming tasks
export async function POST(request: NextRequest) {
  try {
    const { userId, taskId }: CompleteTaskRequestBody = await request.json();

    // Validate input
    if (!userId || !taskId) {
      return NextResponse.json({ message: 'User ID and Task ID are required' }, { status: 400 });
    }

    // Check if the task exists
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    // Check if the user has already completed the task
    const userTask = await prisma.userTask.findFirst({
      where: { userId, taskId },
    });

    if (!userTask) {
      // Task has not been started/completed by the user
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    if (userTask.claimed) {
      // Task reward has already been claimed
      return NextResponse.json({ message: 'Task already completed and claimed' }, { status: 400 });
    }

    // If the task is completed but not yet claimed, mark it as claimed
    const updatedUserTask = await prisma.userTask.update({
      where: { id: userTask.id },
      data: { claimed: true },
    });

    // Update the user's rewards (coins or XP, based on task rewards)
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        coins: {
          increment: task.rewards, // Increment user's coins by the task's rewards
        },
      },
    });

    return NextResponse.json({
      message: 'Task reward claimed successfully',
      task: updatedUserTask,
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error completing task:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
