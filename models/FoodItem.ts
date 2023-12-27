import { Document, Model, model, models, Schema } from "mongoose";

//interface definition for the Food document
export interface IFood extends Document {
  code_kfct: string;
  english_name: string;
  scientific_name: string;
  foodgroup: string;
  PROTCNT: number;
  CHOAVLDF: number;
  FIBTG: number;
  FATCE: number;
  GI: number;
  longitude: number;
  latitude: number;
}

// FoodItem schema definition
const FoodItemSchema = new Schema({
  code_kftc: {
    type: String,
    required: true,
  },
  english_name: {
    type: String,
    required: true,
  },
  scientific_name: {
    type: String,
    required: false,
  },
  foodgroup: {
    type: String,
    required: true,
  },
  PROTCNT: {
    type: Number,
    required: false,
  },
  CHOAVLDF: {
    type: Number,
    required: false,
  },
  FIBTG: {
    type: Number,
    required: false,
  },
  FATCE: {
    type: Number,
    required: false,
  },
  GI: {
    type: Number,
    required: false,
  },
  longitude: {
    type: Number,
    required: false,
  },
  latitude: {
    type: Number,
    required: false,
  },
});

// Food model definition and export
const FoodItem: Model<IFood> =
  models.Food || model<IFood>("FoodItem", FoodItemSchema);

export default FoodItem;
