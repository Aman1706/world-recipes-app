import express from "express";

import {
  getCuisine,
  getCuisines,
  createCuisine,
  updateCuisine,
  deleteCuisine,
} from "../controllers/cuisine.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getCuisines);
router.get("/:id", getCuisine);
router.post("/", auth, createCuisine);
router.patch("/:id", auth, updateCuisine);
router.delete("/:id", auth, deleteCuisine);

export default router;
