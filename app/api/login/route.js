import { NextResponse } from "next/server";
import { signIn } from "../../../auth";
import { AuthError } from "next-auth";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      throw new Error(result.error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}


export async function GET() {
  return NextResponse.json({ error: "Method not allowed :(" }, { status: 405 });
}