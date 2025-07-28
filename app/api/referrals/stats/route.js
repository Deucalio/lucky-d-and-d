import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { prisma } from "../../../lib/prisma";
export async function POST(req) {
  try {
    // const session = await auth();
    // console.log("Session:", session.user);

    const { email } = await req.json();

    // Get the user from the database
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get all referrals where the current user is the referrer
    const referrals = await prisma.referral.findMany({
      where: { referrer_id: user.id },
    });

    // Calculate stats
    const totalReferrals = referrals.length;
    const approvedReferrals = referrals.filter((ref) => ref.approved).length;
    const pendingReferrals = totalReferrals - approvedReferrals;

    // Calculate bonus amounts
    const totalBonus = referrals.reduce(
      (sum, ref) => sum + Number(ref.bonus),
      0
    );
    const approvedBonus = referrals
      .filter((ref) => ref.approved)
      .reduce((sum, ref) => sum + Number(ref.bonus), 0);
    const pendingBonus = totalBonus - approvedBonus;

    return NextResponse.json({
      totalReferrals,
      approvedReferrals,
      pendingReferrals,
      totalBonus: `$${totalBonus.toFixed(2)}`,
      approvedBonus: `$${approvedBonus.toFixed(2)}`,
      pendingBonus: `$${pendingBonus.toFixed(2)}`,
    });
  } catch (error) {
    console.error("Error fetching referral stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch referral stats" },
      { status: 500 }
    );
  }
}
