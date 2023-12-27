import mongoose, { Schema } from "mongoose";

const patientSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email_address: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  password: { type: String, required: true },
  phone_number: { type: String, required: true },
});

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
