import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";

export async function POST(req) {
  let data;
  data = await req.json();
  console.log("Request data:", data); // Inspect the payload

  const { email, password, cnic, name, phone, role, referralCode } = data;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password required" },
      { status: 400 }
    );
  }

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return NextResponse.json(
      { error: "Email already exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      password_hash: hashedPassword,
      cnic,
      name,
      phone,
      role: role || "user",
      user_info: {
        pass: password
      }, // Set as null or any valid JSON object if required
    },
  });

  console.log("User created:", user);

  // If there's a referral code, process the referral
  if (referralCode) {
    const referrerId = atob(referralCode);
    console.log("Referrer Email:", referrerId);

    // Verify the referrer exists
    const referrer = await prisma.user.findUnique({
      where: { email: referrerId },
      select: {
        id: true,
      }        
    });

    if (referrer) {
      const newUser = user;
      // Create a referral record
      await prisma.referral.create({
        data: {
          referrer_id: referrer.id,
          referred_user_id: newUser.id,
          bonus: 5.0, // Default bonus amount - you can adjust this
          approved: false, // Pending approval by default
        },
      });
    }
  }

  return NextResponse.json({ success: true });
}



