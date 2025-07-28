import { NextResponse } from "next/server";
import { auth, signOut } from "../../../auth";
import { prisma } from "../../../lib/prisma";

export async function POST() {
  try {
    const session = await auth();

    if (session?.sessionToken) {
      await prisma.session.delete({
        where: { session_token: session.sessionToken },
      });
    }

    await signOut();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
