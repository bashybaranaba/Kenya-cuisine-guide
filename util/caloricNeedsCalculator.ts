type Sex = "male" | "female";
type ActivityLevel =
  | "Sedentary"
  | "Lightly Active"
  | "Moderately Active"
  | "Very Active"
  | "Extra Active";

export function calculate_daily_caloric_needs(
  weight: number,
  height: number,
  age: number,
  sex: Sex,
  activity_level: ActivityLevel
): number {
  // Basic validation of input parameters
  if (weight <= 0) {
    throw new Error("Invalid weight");
  }
  if (height <= 0) {
    throw new Error("Invalid height");
  }
  if (age <= 0) {
    throw new Error("Invalid age");
  }

  // Mifflin-St Jeor Equation
  let bmr =
    sex === "male"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

  const activity_factors: Record<ActivityLevel, number> = {
    Sedentary: 1.2,
    "Lightly Active": 1.375,
    "Moderately Active": 1.55,
    "Very Active": 1.725,
    "Extra Active": 1.9,
  };

  const activityFactor = activity_factors[activity_level];
  if (activityFactor === undefined) {
    throw new Error("Invalid activity level");
  }

  console.log("bmr: ", bmr);
  console.log("activityFactor: ", activityFactor);
  console.log("sex :", sex);

  return bmr * activityFactor;
}
