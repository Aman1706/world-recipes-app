import axios from "axios";

const url = "https://world-recipes-project-aman.herokuapp.com/";
// const url = "http://localhost:5000";

const API = axios.create({ baseURL: url });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchCuisines = API.get("/cuisines");

export const fetchRecipesByCuisineId = (cuisineId) =>
  API.get(`/recipes/cuisine/${cuisineId}`);
export const fetchRecipes = API.get("/recipes");
export const fetchRecipe = (recipeId) => API.get(`/recipes/${recipeId}`);
export const createRecipe = (recipeData) => API.post("/recipes", recipeData);
export const updateRecipe = (recipeId, updatedRecipe) =>
  API.patch(`/recipes/${recipeId}`, updatedRecipe);
export const deleteRecipe = (recipeId) => API.delete(`/recipes/${recipeId}`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
