import { NextResponse, NextRequest } from "next/server";
import HeartRateMeasurement from "@/models/HeartRateMeasurement";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import dbConnect from "../../../../lib/dbConnect";

export async function POST(request: Request) {
  await dbConnect();
  const { heart_rate }: any = await request.json();
  const token = request.headers.get("Authorization");
  console.log("token: ", token);
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

  try {
    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const heartRateMeasurement = await HeartRateMeasurement.create({
      heart_rate,
      user_id: userId,
    });

    console.log(heartRateMeasurement);
    return new NextResponse(
      JSON.stringify({
        message: "Weight measurement created successfully",
        heartRateMeasurement,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: "Error creating weight measurement" }),
      { status: 500 }
    );
  }
}
