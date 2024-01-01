import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "../../../../models/User";
import dbConnect from "../../../../lib/dbConnect";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  await dbConnect();
  const { email, password }: any = await request.json();

  const user = await User.findOne({ email_address: email });
  if (!user) {
    return new NextResponse(
      JSON.stringify({ message: "Invalid email or password" }),
      { status: 401 }
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return new NextResponse(
      JSON.stringify({ message: "Invalid email or password" }),
      { status: 401 }
    );
  }

  // Generate JWT
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET, // Ensure you have a JWT_SECRET in your .env
    { expiresIn: "1h" }
  );

  return new NextResponse(
    JSON.stringify({
      message: "Login successful",
      token,
      user: { email: user.email, name: user.name },
    }),
    { status: 200 }
  );
}
