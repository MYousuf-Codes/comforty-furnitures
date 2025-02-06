import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "/utils/mongodb"; // MongoDB connection
import User from "/models/User"; // Mongoose model for User

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Check if the email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    // Create the user
    const user = new User({
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    // Save the user to the database
    await user.save();

    return NextResponse.json({ message: "User registered successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong. Try again later." }, { status: 500 });
  }
}
