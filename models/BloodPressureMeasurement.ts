import mongoose from "mongoose";
import Patient from "./User";
const { ObjectId } = mongoose.Schema.Types;

export interface BloodPressureMeasurement {
  patient: object;
  value: number;
}

const BloodPressureMeasurementSchema =
  new mongoose.Schema<BloodPressureMeasurement>(
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

const BloodPressureMeasurement =
  mongoose.models.BloodPressureMeasurement ||
  mongoose.model("BloodPressureMeasurement", BloodPressureMeasurementSchema);

export default BloodPressureMeasurement;
