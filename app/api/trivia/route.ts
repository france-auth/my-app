import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust the path to your Prisma client

export async function GET(req: NextRequest) {
    console.log(req.url)
  try {
    // Fetch the stored trivia state (if it exists)
    const triviaState = await prisma.triviaState.findUnique({
      where: { tid: 1 },
    });

    const now = new Date();
    const currentDay = now.toISOString().split("T")[0]; // YYYY-MM-DD

    if (triviaState && triviaState.lastTriviaDate === currentDay) {
      // If today's trivia is already set, return the stored questions
      return NextResponse.json(triviaState.questions);
    }

    // Fetch all questions from the question bank
    const questionBank = await prisma.question.findMany();

    if (questionBank.length < 1) {
      return NextResponse.json(
        { message: "Not enough questions in the bank." },
        { status: 400 }
      );
    }

    // Select 5 random questions
    const selectedQuestions = getRandomQuestions(questionBank, 1);

    // Update or create the trivia state for today
    await prisma.triviaState.upsert({
      where: { tid: 1 },
      update: { questions: selectedQuestions, lastTriviaDate: currentDay },
      create: {
        tid: 1,
        questions: selectedQuestions,
        lastTriviaDate: currentDay,
      },
    });

    // Return the selected questions
    return NextResponse.json(selectedQuestions);
  } catch (error) {
    console.error("Error fetching daily trivia:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Helper function to randomly select 'n' questions from the question bank
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getRandomQuestions(questionBank: any[], count: number) {
  const shuffled = [...questionBank].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
