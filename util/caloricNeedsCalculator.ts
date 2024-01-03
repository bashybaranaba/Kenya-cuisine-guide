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
    Sedentary: 1.2,
    "Lightly active": 1.375,
    "Moderately active": 1.55,
    "Very active": 1.725,
    "Extra active": 1.9,
  };

  return bmr * (activity_factors[activity_level] || 1.2);
}
