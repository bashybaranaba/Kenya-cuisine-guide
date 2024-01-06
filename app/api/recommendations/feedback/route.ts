import { NextResponse } from "next/server";
import Recommendations from "../../../../models/Recommendations";
import dbConnect from "../../../../lib/dbConnect";

export async function PUT(request: Request) {
  await dbConnect();

  // Extracting the feedback details and recommendation ID from the request
  const { recommendation_id, text_review, rating }: any = await request.json();
  console.log("details :", recommendation_id, text_review, rating);

  try {
    // Find the recommendation by ID and update it
    const updatedFeedback = await Recommendations.findByIdAndUpdate(
      recommendation_id,
      {
        text_review,
        rating,
      },
      { new: true } // Return the updated document
    );

    if (!updatedFeedback) {
      return new NextResponse(
        JSON.stringify({ message: "Recommendation not found" }),
        { status: 404 }
      );
    }

    console.log(updatedFeedback);

    return new NextResponse(
      JSON.stringify({
        message: "Feedback updated successfully",
        feedback: updatedFeedback,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: "Error updating feedback" }),
      { status: 500 }
    );
  }
}
