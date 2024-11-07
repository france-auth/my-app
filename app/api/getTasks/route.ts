import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface TaskResponse {
  id: string;
  title: string;
  imagePath?: string | null;
  rewards: number;
  taskUrl?: string | null;
  claimed: boolean;
}

export async function GET(request: NextRequest) {
  try {
   const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId'); 

    if (!userId) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    // Fetch all tasks
    const tasks = await prisma.task.findMany();

    // Fetch user's progress on tasks
    const userTasks = await prisma.userTask.findMany({
      where: { userId },
      include: {
        task: true,
      },
    });

    

    // Map tasks to include progress and claim status
    const tasksWithProgress: TaskResponse[] = tasks.map((task) => {
      const userTask = userTasks.find((ut) => ut.taskId === task.id);
      return {
        id: task.id,
        title: task.title,
        imagePath: task.imagePath,
        rewards: task.rewards,
        taskUrl: task.taskUrl,
        claimed: userTask?.claimed || false,
      };
    });

    return NextResponse.json(tasksWithProgress);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
