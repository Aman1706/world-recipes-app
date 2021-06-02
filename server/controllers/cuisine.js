import mongoose from "mongoose";
import Cuisine from "../models/cuisine.js";

export const getCuisines = async (req, res) => {
  try {
    const cuisines = await Cuisine.find()
      .sort({ createdAt: -1 })
      .populate("user");

    res.status(200).json(cuisines);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCuisine = async (req, res) => {
  const { id } = req.params;

  try {
    const cuisine = await Cuisine.findById(id);

    res.status(200).json(cuisine);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCuisine = async (req, res) => {
  const cuisine = req.body;
  const newCuisine = new Cuisine({
    ...cuisine,
    user: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newCuisine.save();

    res.status(201).json(newCuisine);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateCuisine = async (req, res) => {
  const { id: _id } = req.params;
  const cuisine = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).json({ message: "No Cuisines with that ID" });
  }

  const updatedCuisine = await Cuisine.findByIdAndUpdate(
    _id,
    {
      ...cuisine,
      _id,
    },
    { new: true }
  );

  res.json(updatedCuisine);
};

export const deleteCuisine = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "No Cuisines with that ID" });
  }

  await Cuisine.findByIdAndRemove(id);

  res.json({ message: "Successfully deleted" });
};
