import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { prisma } from "../../../lib/prisma";
export async function GET(req) {
  try {


    const referrals = await prisma.referral.findMany({
      include: {
        referrer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        referred_user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Format the referral data in the specified structure
    const formattedReferrals = referrals.map((referral) => {
      const bonusAmount = "Rs 5.00"; // Assuming fixed bonus amount as per your example

      return {
        id: referral.id,
        referrer: {
          id: referral.referrer.id,
          name: referral.referrer.name,
          email: referral.referrer.email,
          avatar: `/placeholder.svg?height=40&width=40`, // Placeholder avatar
        },
        referred: {
          id: referral.referred_user.id,
          name: referral.referred_user.name,
          email: referral.referred_user.email,
          avatar: `/placeholder.svg?height=40&width=40`, // Placeholder avatar
        },
        date: referral.created_at.toISOString().split("T")[0], // Format the date to "YYYY-MM-DD"
        status: referral.approved
          ? referral.approved
            ? "approved"
            : "rejected"
          : "pending",
        bonus_amount: bonusAmount,
        tickets_purchased: 3, // This can be retrieved from elsewhere if available
      };
    });

    return NextResponse.json({
      formattedReferrals,
    });
  } catch (error) {
    console.error("Error fetching referral stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch referral stats" },
      { status: 500 }
    );
  }
}
