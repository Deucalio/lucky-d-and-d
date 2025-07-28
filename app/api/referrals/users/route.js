import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { prisma } from "../../../lib/prisma";

export async function POST(req) {
  try {
    // const session = await auth();
    // Get the user from the database

    const { email } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get all referrals where the current user is the referrer
    const referrals = await prisma.referral.findMany({
      where: { referrer_id: user.id },
      include: {
        referred_user: {
          select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
          },
        },
      },
      orderBy: { created_at: "desc" },
    });

    // Format the data for the frontend
    const referredUsers = referrals.map((referral) => ({
      id: referral.referred_user.id,
      name: referral.referred_user.name,
      email: referral.referred_user.email,
      createdAt: referral.referred_user.created_at.toISOString(),
      bonus: `$${Number(referral.bonus).toFixed(2)}`,
      approved: referral.approved,
    }));

    return NextResponse.json({ referredUsers });
  } catch (error) {
    console.error("Error fetching referred users:", error);
    return NextResponse.json(
      { error: "Failed to fetch referred users" },
      { status: 500 }
    );
  }
}
