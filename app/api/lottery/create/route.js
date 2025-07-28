import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function POST(request) {


  // Create a lottery
  const {
    name,
    description,
    prize_pool,
    status,
    entry_cost,
    total_tickets,
    end_time,
    lottery_info,
  } = await request.json();

  try {
    const lottery = await prisma.lottery.create({
      data: {
        name,
        description,
        prize_pool,
        entry_cost,
        total_tickets,
        end_time,
        lottery_info,
        status: status ? status : "active",
      },
    });

    return NextResponse.json({
      status: 200,
      message: "Lottery created successfully",
      data: lottery,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
