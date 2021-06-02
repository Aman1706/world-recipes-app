import mongoose from "mongoose";
import Recipe from "../models/recipe.js";

export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();

    res.status(200).json(recipes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getRecipesByCuisineId = async (req, res) => {
  const { cuisineId } = req.params;
  try {
    const recipes = await Recipe.find({ cuisine: cuisineId })
      .sort({ createdAt: -1 })
      .populate("cuisine");

    return res.status(200).json(recipes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id).populate("cuisine");

    res.status(200).json(recipe);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createRecipe = async (req, res) => {
  const recipe = req.body;
  const newRecipe = new Recipe({
    ...recipe,
    user: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newRecipe.save();

    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateRecipe = async (req, res) => {
  const { id: _id } = req.params;
  const recipe = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).json({ message: "No Recipes with this ID" });
  }

  const updatedRecipe = await Recipe.findByIdAndUpdate(
    _id,
    { ...recipe, _id },
    { new: true }
  );

  res.json(updatedRecipe);
};

export const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "No Recipes with this ID" });
  }

  await Recipe.findByIdAndRemove(id);

  res.json({ message: "Successfully deleted" });
};
