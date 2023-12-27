import mongoose from "mongoose";
import Patient from "./Patient";
const { ObjectId } = mongoose.Schema.Types;

export interface WeightMeasurement {
  patient: object;
  value: number;
}

const WeightMeasurementSchema = new mongoose.Schema<WeightMeasurement>(
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

const WeightMeasurement =
  mongoose.models.WeightMeasurement ||
  mongoose.model("WeightMeasurement", WeightMeasurementSchema);

export default WeightMeasurement;
