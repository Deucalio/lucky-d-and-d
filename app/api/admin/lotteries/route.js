import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    // Fetch recent lotteries

    const lotteries = await prisma.lottery.findMany({
      orderBy: {
        created_at: "desc",
      },
      include: {
        User_Lottery: {
          select: {
            id: true,
          },
        },
      },
    });

    return NextResponse.json({
      status: 200,
      data: lotteries,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
