import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email_address: { type: String, required: true },
  age: { type: Number, required: false },
  height: { type: String, required: false },
  activitylevel: { type: String, required: false },
  gender: { type: String, required: false },
  password: { type: String, required: true },
  phone_number: { type: String, required: false },
  weight: { type: Number, required: false },
  allergies: { type: Array, required: false },
  blood_sugar: { type: Number, required: false },
  blood_pressure: { type: Number, required: false },
  cholesterol: { type: Number, required: false },
  heart_rate: { type: Number, required: false },
  medications: { type: Array, required: false },
  medical_conditions: { type: Array, required: false },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
