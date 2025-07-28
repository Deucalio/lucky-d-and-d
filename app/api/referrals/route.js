import { NextResponse } from "next/server";

// Mock user data (simulating authenticated user)
const currentUser = {
  id: 1,
  name: "John Smith",
  email: "john.smith@example.com",
};

// Mock referral data
const mockReferrals = [
  {
    id: 1,
    referrer_id: 1,
    referred_user_id: 2,
    bonus: 5.0,
    approved: true,
    created_at: new Date("2024-03-01"),
    referred_user: {
      id: 2,
      name: "Alex Johnson",
      email: "alex.j@example.com",
      created_at: new Date("2024-03-01"),
    },
  },
  {
    id: 2,
    referrer_id: 1,
    referred_user_id: 3,
    bonus: 5.0,
    approved: false,
    created_at: new Date("2024-03-05"),
    referred_user: {
      id: 3,
      name: "Thomas Clark",
      email: "thomas.c@example.com",
      created_at: new Date("2024-03-05"),
    },
  },
  {
    id: 3,
    referrer_id: 1,
    referred_user_id: 4,
    bonus: 5.0,
    approved: true,
    created_at: new Date("2024-02-28"),
    referred_user: {
      id: 4,
      name: "Emma Wilson",
      email: "emma.w@example.com",
      created_at: new Date("2024-02-28"),
    },
  },
  {
    id: 4,
    referrer_id: 1,
    referred_user_id: 5,
    bonus: 5.0,
    approved: true,
    created_at: new Date("2024-02-20"),
    referred_user: {
      id: 5,
      name: "James Brown",
      email: "james.b@example.com",
      created_at: new Date("2024-02-20"),
    },
  },
  {
    id: 5,
    referrer_id: 1,
    referred_user_id: 6,
    bonus: 5.0,
    approved: false,
    created_at: new Date("2024-02-15"),
    referred_user: {
      id: 6,
      name: "Olivia Davis",
      email: "olivia.d@example.com",
      created_at: new Date("2024-02-15"),
    },
  },
];

export async function GET() {
  try {
    // In a real app, you would get the current user from the session
    // For this preview, we're using the mock user

    // 1. Generate referral link
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const referralLink = `${baseUrl}/register?ref=${currentUser.id}`;

    // 2. Calculate referral stats
    const totalReferrals = mockReferrals.length;
    const approvedReferrals = mockReferrals.filter(
      (ref) => ref.approved
    ).length;
    const pendingReferrals = totalReferrals - approvedReferrals;

    // Calculate bonus amounts
    const totalBonus = mockReferrals.reduce((sum, ref) => sum + ref.bonus, 0);
    const approvedBonus = mockReferrals
      .filter((ref) => ref.approved)
      .reduce((sum, ref) => sum + ref.bonus, 0);
    const pendingBonus = totalBonus - approvedBonus;

    // 3. Format referred users data
    const referredUsers = mockReferrals.map((referral) => ({
      id: referral.referred_user.id,
      name: referral.referred_user.name,
      email: referral.referred_user.email,
      createdAt: referral.referred_user.created_at.toISOString(),
      bonus: `$${referral.bonus.toFixed(2)}`,
      approved: referral.approved,
    }));

    // Return all data in a single response
    return NextResponse.json({
      referralLink,
      stats: {
        totalReferrals,
        approvedReferrals,
        pendingReferrals,
        totalBonus: `$${totalBonus.toFixed(2)}`,
        approvedBonus: `$${approvedBonus.toFixed(2)}`,
        pendingBonus: `$${pendingBonus.toFixed(2)}`,
      },
      referredUsers,
    });
  } catch (error) {
    console.error("Error processing referral data:", error);
    return NextResponse.json(
      { error: "Failed to process referral data" },
      { status: 500 }
    );
  }
}

// Handle registration with referral
export async function POST(req) {
  try {
    const { name, email, password, phone, referralCode } = await req.json();

    // In a real app, you would:
    // 1. Check if user already exists
    // 2. Hash the password
    // 3. Create the new user
    // 4. Process the referral if referralCode exists

    // For this preview, we'll just return a success message
    return NextResponse.json(
      { message: "User registered successfully with referral" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
