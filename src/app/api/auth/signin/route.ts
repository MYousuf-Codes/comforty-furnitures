// src/app/api/auth/signin/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "/utils/mongodb";
import User from "/models/User"; // Mongoose model for User

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Compare password with the hashed one
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Session creation or JWT token generation (with NextAuth.js if you're using it)
    return NextResponse.json({ message: "Login successful", userId: user._id });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong. Try again later." }, { status: 500 });
  }
}
