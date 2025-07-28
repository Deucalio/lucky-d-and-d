import { NextResponse } from "next/server";
import { auth, signOut } from "../../../auth";
import { prisma } from "../../lib/prisma";

export async function DELETE() {
  try {
    const r = await prisma.session.deleteMany({});
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
