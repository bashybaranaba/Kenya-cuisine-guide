import mongoose from "mongoose";

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
  CHOLESTROL: number;
  P: number;
  EDIBLE: number;
  ASH: number;
  WATER: number;
  ENERGY: number;
  longitude: number;
  latitude: number;
}

// FoodItem schema definition
const FoodItemSchema = new mongoose.Schema({
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
  CHOLESTROL: {
    type: Number,
    required: false,
  },
  P: {
    type: Number,
    required: false,
  },
  EDIBLE: {
    type: Number,
    required: false,
  },
  ASH: {
    type: Number,
    required: false,
  },
  WATER: {
    type: Number,
    required: false,
  },
  ENERGY: {
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

const FoodItem =
  mongoose.models.FoodItem || mongoose.model("FoodItem", FoodItemSchema);

export default FoodItem;
