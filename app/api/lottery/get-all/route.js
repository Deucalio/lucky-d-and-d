import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(request) {
  try {
    // Fetch all lotteries

    const lotteries = await prisma.lottery.findMany({
      // By most recent
      orderBy: {
        created_at: "desc",
      },
      include: {
        User_Lottery: true
      }
    });

    return NextResponse.json({
      status: 200,
      message: "All lotteries fetched successfully",
      data: lotteries,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
