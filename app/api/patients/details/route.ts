import { NextResponse } from "next/server";
import User from "../../../../models/User";
import dbConnect from "../../../../lib/dbConnect";
import jwt from "jsonwebtoken";

export async function GET(request: Request) {
  await dbConnect();
  const token = request.headers.get("Authorization")?.split(" ")[1];

  // Verify token and extract user ID
  let userId;
  try {
    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET || "JWT_SECRET"
    ) as jwt.JwtPayload;
    userId = decoded.userId;
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const user = await User.findById(userId);
  if (!user) {
    return new NextResponse(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }

  return new NextResponse(JSON.stringify(user), {
    status: 200,
  });
}
