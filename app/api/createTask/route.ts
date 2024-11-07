import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust path to your Prisma client

interface Task {
  taskType: "daily" | "social";
  title: string;
  rewards: number
}

export async function POST(request: NextRequest) {
  try {
    const { tasks }: { tasks: Task[] } = await request.json();

    if (!Array.isArray(tasks) || tasks.length === 0) {
      return NextResponse.json(
        { message: "Invalid input. Provide an array of tasks." },
        { status: 400 }
      );
    }

    const createdTasks = await prisma.task.createMany({
      data: tasks,
    });

    return NextResponse.json(
      { message: "Tasks added successfully", count: createdTasks.count },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding tasks:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
