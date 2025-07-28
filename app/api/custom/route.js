import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(request) {
  try {
    // Fetch all lotteries
    

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
