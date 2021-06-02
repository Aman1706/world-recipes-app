import mongoose from "mongoose";

const cuisineSchema = mongoose.Schema({
  name: { type: String },
  icon: { type: String },
  user: { type: String, ref: "user" },
  createdAt: { type: Date, default: new Date() },
});

export default mongoose.model("cuisine", cuisineSchema);
