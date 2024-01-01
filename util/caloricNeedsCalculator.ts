export function calculate_daily_caloric_needs(
  weight: number,
  height: number,
  age: number,
  sex: string,
  activity_level: string
): number {
  // Mifflin-St Jeor Equation
  let bmr: number;
  if (sex === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const activity_factors: { [key: string]: number } = {
    sedentary: 1.2,
    "lightly active": 1.375,
    "moderately active": 1.55,
    "very active": 1.725,
    "extra active": 1.9,
  };

  return bmr * (activity_factors[activity_level] || 1.2);
}
