import express from "express";

import {
  getRecipe,
  getRecipes,
  getRecipesByCuisineId,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipe.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getRecipes);
router.get("/:id", getRecipe);
router.get("/cuisine/:cuisineId", getRecipesByCuisineId);
router.post("/", auth, createRecipe);
router.patch("/:id", auth, updateRecipe);
router.delete("/:id", auth, deleteRecipe);

export default router;
