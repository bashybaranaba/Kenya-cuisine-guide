import FoodItem from "../../../models/FoodItem";
import User from "../../../models/User";
import Recommendations from "../../../models/Recommendations";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "../../../lib/dbConnect";

import { calculate_daily_caloric_needs } from "../../../util/caloricNeedsCalculator";

// Function to get the caloric percentage for a meal
function getCaloricPercentageForMeal(mealType: string): number {
  const mealCaloricPercentages: { [key: string]: number } = {
    breakfast: 0.25,
    lunch: 0.25,
    supper: 0.35,
    snacks: 0.1,
  };

  return mealCaloricPercentages[mealType];
}

function getNutritionalCriteriaForMeal(
  mealType: string,
  calories: number,
  user: any
): any {
  let criteria: any = { ENERGY: { $lte: calories } };

  // Add macronutrient criteria based on meal type
  if (mealType === "breakfast") {
    criteria.FIBTG = { $gte: 3 }; // High in fiber
    criteria.GI = { $lte: 70 }; // Low glycemic index
  } else if (mealType === "lunch") {
    criteria.PROTCNT = { $gte: 10 }; // High in protein
  } else if (mealType === "dinner") {
    criteria.FATCE = { $lte: 10 }; // Lower in fats
  }

  // Add user-specific dietary restrictions and preferences
  if (user.allergies && user.allergies.length) {
    criteria.ingredients = { $nin: user.allergies };
  }
  if (user.dietaryPreferences) {
    // Include dietary preferences such as vegetarian, gluten-free, etc.
    // Assuming FoodItem model has a field 'dietType' for this purpose
    criteria.dietType = { $in: user.dietaryPreferences };
  }

  // Additional health-related criteria
  // Example: adjust for cholesterol, blood pressure, etc.

  // ... Other criteria based on user's health data
  return criteria;
}

// Function to get meal recommendations
async function getMealRecommendations(
  userId: string,
  mealType: string,
  noOfRecommendations: any
): Promise<any[]> {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const dailyCaloricNeeds = 3329;

  console.log("User: ", user);
  console.log("Daily caloric needs: ", dailyCaloricNeeds);

  const mealCaloricAllocation =
    dailyCaloricNeeds * getCaloricPercentageForMeal(mealType);
  const mealCriteria = getNutritionalCriteriaForMeal(
    mealType,
    mealCaloricAllocation,
    user
  );

  console.log("Meal criteria: ", mealCriteria);

  // Exclude items with poor ratings (below 3 on a scale of 5) by the user
  const poorlyRatedItems = await Recommendations.find({
    patient: userId,
    rating: { $lt: 3 },
  });
  const excludedItems = poorlyRatedItems.map((item) => item.fooditem);
  mealCriteria._id = { $nin: excludedItems };

  const recommendedItems = await FoodItem.find(mealCriteria).limit(
    noOfRecommendations
  );

  // Store recommendations in the database with an initial null rating and return food recommendations with their recommendation ids
  await dbConnect();
  for (const item of recommendedItems) {
    const recommendation = await Recommendations.create({
      patient: userId,
      fooditem: item._id,
      rating: null,
    });
    item.recommendationId = recommendation._id;
  }

  const recommendeditems = recommendedItems.map((item) => {
    return {
      foodDetails: item,
      recommendationId: item.recommendationId,
    };
  });

  console.log("Recommended items: ", recommendeditems);

  return recommendeditems;
}

// Function to get a full day meal plan
async function getFullDayMealPlan(
  userId: string,
  noOfRecommendations: any
): Promise<any> {
  const mealTypes: any = ["breakfast", "lunch", "supper", "snacks"];
  let mealPlan: any = {};

  for (const mealType of mealTypes) {
    mealPlan[mealType] = await getMealRecommendations(
      userId,
      mealType,
      noOfRecommendations
    );
  }

  return mealPlan;
}

export async function GET(request: Request, response: NextResponse) {
  await dbConnect();
  const token = request.headers.get("Authorization")?.split(" ")[1];
  //get no of recommendations from params
  const { searchParams } = new URL(request.url);
  const no_of_recommendations = searchParams.get("no_of_recommendations");
  console.log("no_of_recommendations: ", no_of_recommendations);

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

  const mealPlan = await getFullDayMealPlan(
    userId as string,
    no_of_recommendations
  );

  return new NextResponse(JSON.stringify(mealPlan), {
    status: 200,
  });
}
