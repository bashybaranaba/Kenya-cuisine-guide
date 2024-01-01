import mongoose from "mongoose";
import Patient from "./User";
import FoodItem from "./FoodItem";
const { ObjectId } = mongoose.Schema.Types;

export interface Recommendations {
  patient: object;
  breakfast: {
    fooditem: object;
    blood_glucose_before: number;
    blood_glucose_after: number;
  };
  lunch: {
    fooditem: object;
    blood_glucose_before: number;
    blood_glucose_after: number;
  };
  dinner: {
    fooditem: object;
    blood_glucose_before: number;
    blood_glucose_after: number;
  };
  snacks: {
    fooditem: object;
    blood_glucose_before: number;
    blood_glucose_after: number;
  };
}

const RecommendationsSchema = new mongoose.Schema<Recommendations>(
  {
    patient: {
      type: ObjectId,
      ref: Patient,
    },
    breakfast: {
      fooditem: {
        type: ObjectId,
        ref: FoodItem,
      },
      blood_glucose_before: {
        type: Number,
        required: false,
      },
      blood_glucose_after: {
        type: Number,
        required: false,
      },
    },
    lunch: {
      fooditem: {
        type: ObjectId,
        ref: FoodItem,
      },
      blood_glucose_before: {
        type: Number,
        required: false,
      },
      blood_glucose_after: {
        type: Number,
        required: false,
      },
    },
    dinner: {
      fooditem: {
        type: ObjectId,
        ref: FoodItem,
      },
      blood_glucose_before: {
        type: Number,
        required: false,
      },
      blood_glucose_after: {
        type: Number,
        required: false,
      },
    },
    snacks: {
      fooditem: {
        type: ObjectId,
        ref: FoodItem,
      },
      blood_glucose_before: {
        type: Number,
        required: false,
      },
      blood_glucose_after: {
        type: Number,
        required: false,
      },
    },
  },
  { timestamps: true }
);

const Recommendations =
  mongoose.models.Recommendations ||
  mongoose.model("Recommendations", RecommendationsSchema);

export default Recommendations;
