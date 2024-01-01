import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import User from "../../../../models/User";
import dbConnect from "../../../../lib/dbConnect";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  await dbConnect();
  const { email, password, first_name, last_name }: any = await request.json();
  console.log(email, password, first_name, last_name);
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new NextResponse(
      JSON.stringify({ message: "User already exists" }),
      { status: 409 }
    );
  }
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = await User.create({
    email_address: email,
    password: hashedPassword,
    first_name,
    last_name,
  });
  // Generate JWT
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET || "JWT_SECRET", // Ensure you have a JWT_SECRET in your .env
    { expiresIn: "1h" }
  );

  return new NextResponse(
    JSON.stringify({
      message: "Sign Up successful",
      token,
      user: { email: user.email, name: user.name },
    }),
    { status: 200 }
  );
}
