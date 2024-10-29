import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Adjust path as needed

interface Question {
  question: string;
  options: string[];
  answer: string;
}

export async function POST(request: NextRequest) {
  try {
    // Extract questions from the request body
    const { questions }: { questions: Question[] } = await request.json();

    // Validate input: ensure it's an array with at least one question
    if (!Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json(
        { message: "Invalid request. 'questions' should be a non-empty array." },
        { status: 400 }
      );
    }

    // Use Prisma's `createMany` to insert multiple questions at once
    const createdQuestions = await prisma.question.createMany({
      data: questions.map((q) => ({
        text: q.question,
        options: q.options,
        answer: q.answer,
      }))
    });

    // Respond with a success message and count of created questions
    return NextResponse.json(
      {
        message: 'Questions created successfully.',
        count: createdQuestions.count,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating questions:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
