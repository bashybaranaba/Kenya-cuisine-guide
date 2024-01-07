import mongoose from "mongoose";
import Patient from "./User";
const { ObjectId } = mongoose.Schema.Types;

export interface HeartRateMeasurement {
  patient: object;
  value: number;
}

const HeartRateMeasurementSchema = new mongoose.Schema<HeartRateMeasurement>(
  {
    patient: {
      type: ObjectId,
      ref: Patient,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const HeartRateMeasurement =
  mongoose.models.HeartRateMeasurement ||
  mongoose.model("HeartRateMeasurement", HeartRateMeasurementSchema);

export default HeartRateMeasurement;
