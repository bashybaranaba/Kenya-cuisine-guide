import { NextResponse, NextRequest } from "next/server";
import BloodGlucoseMeasurement from "@/models/BloodGlucoseMeasurement";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import dbConnect from "../../../../lib/dbConnect";

export async function POST(request: Request) {
  await dbConnect();
  const { glucose_level }: any = await request.json();
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

    const bloodGlucoseMeasurement = await BloodGlucoseMeasurement.create({
      glucose_level,
      user_id: userId,
    });

    console.log(bloodGlucoseMeasurement);
    return new NextResponse(
      JSON.stringify({
        message: "Blood glucose measurement created successfully",
        bloodGlucoseMeasurement,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: "Error creating blood glucose measurement" }),
      { status: 500 }
    );
  }
}
