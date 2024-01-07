import { NextResponse, NextRequest } from "next/server";
import WeightMeasurement from "@/models/WeightMeasurement";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import dbConnect from "../../../../lib/dbConnect";

export async function POST(request: Request) {
  await dbConnect();
  const { weight }: any = await request.json();
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

    const weightMeasurement = await WeightMeasurement.create({
      weight,
      user_id: userId,
    });

    console.log(weightMeasurement);
    return new NextResponse(
      JSON.stringify({
        message: "Weight measurement created successfully",
        weightMeasurement,
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
