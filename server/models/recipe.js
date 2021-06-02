import mongoose from "mongoose";

const recipeSchema = mongoose.Schema({
  name: { type: String },
  description: { type: String },
  image: { type: String },
  duration: {
    hours: { type: Number, default: 0 },
    minutes: { type: Number, default: 0 },
  },
  difficulty: { type: String },
  ingredients: { type: String },
  instructions: { type: String },
  user: { type: String },
  creator: { type: String },
  cuisine: { type: String, ref: "cuisine" },
  createdAt: { type: Date, default: new Date() },
});

export default mongoose.model("recipe", recipeSchema);
