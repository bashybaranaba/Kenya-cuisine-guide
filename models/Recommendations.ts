import mongoose from "mongoose";
import Patient from "./Patient";
import FoodItem from "./FoodItem";
const { ObjectId } = mongoose.Schema.Types;

export interface Recommendations {
  patient: object;
  fooditem: object;
  text_review: string;
  rating: number;
}

const RecommendationsSchema = new mongoose.Schema<Recommendations>(
  {
    patient: {
      type: ObjectId,
      ref: Patient,
    },
    fooditem: {
      type: ObjectId,
      ref: FoodItem,
    },
    text_review: {
      type: String,
      required: false,
    },
    rating: {
      type: Number,
      default: 2.5,
    },
  },
  { timestamps: true }
);

const Recommendations =
  mongoose.models.Recommendations ||
  mongoose.model("Recommendations", RecommendationsSchema);

export default Recommendations;
