import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { prisma } from "../../../lib/prisma";

export async function GET(req) {
  try {
    // Get the current user session
    // const session = await getServerSession(authOptions)
    const session = await auth();
    console.log("SESSION: ", session.user);

    if (!session || !session.user.email) {
      return NextResponse.json(
        { error: "You must be logged in to access your referral link" },
        { status: 401 }
      );
    }

    // Get the user from the database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Generate a referral link using the user's ID
    // In a production environment, you might want to encrypt this or use a more secure method
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const referralLink = `${baseUrl}/register?ref=${user.id}`;

    return NextResponse.json({ referralLink });
  } catch (error) {
    console.error("Error generating referral link:", error);
    return NextResponse.json(
      { error: "Failed to generate referral link" },
      { status: 500 }
    );
  }
}
