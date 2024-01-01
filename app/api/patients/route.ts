import { NextResponse } from "next/server";
import User from "../../../models/User";
import dbConnect from "../../../lib/dbConnect";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
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

  const {
    first_name,
    last_name,
    email_address,
    age,
    height,
    activitylevel,
    gender,
    phone_number,
    weight,
    allergies,
    blood_sugar,
    blood_pressure,
    cholesterol,
    medications,
    medical_conditions,
  }: any = await request.json();

  // Update user details
  try {
    await User.findByIdAndUpdate(userId, {
      first_name,
      last_name,
      email_address,
      age,
      height,
      activitylevel,
      gender,
      phone_number,
      weight,
      allergies,
      blood_sugar,
      blood_pressure,
      cholesterol,
      medications,
      medical_conditions,
    });

    return new NextResponse(
      JSON.stringify({ message: "User details updated" }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error updating user details" }),
      { status: 500 }
    );
  }
}
