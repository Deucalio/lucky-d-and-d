import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    // Fetch recent lotteries

    const lotteries = prisma.lottery.findMany({
      orderBy: {
        created_at: "desc",
      },
      include: {
        User_Lottery: true,
      },
    });

    // Fetch recent transactions
    const p = prisma.payment.findMany({
      orderBy: {
        payment_date: "desc",
      },
      include: {
        User: {
          select: {
            name: true,
          }
        }
      }
    });

    // Total Revenue
    const totalRevenue = prisma.user_Lottery.aggregate({
        _sum: {
            invested_amount: true
        }
    });

    // Total Users
    const totalUsers = prisma.user.count();
    // Total tickets
    const totalTickets = prisma.user_Lottery.count();

    const t = await prisma.$transaction([lotteries, p, totalRevenue, totalUsers, totalTickets]);

    return NextResponse.json({
      status: 200,
      data: t,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
