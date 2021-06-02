import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import userRoutes from "./routes/users.js";
import cuisineRoutes from "./routes/cuisines.js";
import recipeRoutes from "./routes/recipes.js";

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/user", userRoutes);
app.use("/cuisines", cuisineRoutes);
app.use("/recipes", recipeRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the World Recipes API");
});

const PORT = process.env.PORT || 5000;
const mongoCluster =
  process.env.CONNECTION_URL || "mongodb://localhost:27017/recipes_app_bk";

mongoose
  .connect(mongoCluster, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`successfully connected to PORT ${PORT}`)
    );
  })
  .catch((error) => {
    console.log(error);
  });

mongoose.set("useFindAndModify", false);
