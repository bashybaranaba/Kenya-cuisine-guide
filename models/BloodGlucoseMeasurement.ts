import mongoose from "mongoose";
import Patient from "./User";
const { ObjectId } = mongoose.Schema.Types;

export interface BloodGlucoseMeasurement {
  patient: object;
  value: number;
}

const BloodGlucoseMeasurementSchema =
  new mongoose.Schema<BloodGlucoseMeasurement>(
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

const BloodGlucoseMeasurement =
  mongoose.models.BloodGlucoseMeasurement ||
  mongoose.model("BloodGlucoseMeasurement", BloodGlucoseMeasurementSchema);

export default BloodGlucoseMeasurement;
