import {
  FETCH_RECIPES_BY_CUISINE_ID,
  FETCH_RECIPES,
  FETCH_RECIPE,
  START_LOADING,
  END_LOADING,
  UPDATE_RECIPE,
  DELETE_RECIPE,
  CREATE_RECIPE,
  SEARCH_RECIPE,
} from "../constants/actionTypes";

import * as api from "../api/index";

export const getRecipesByCuisineId = (cuisineId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchRecipesByCuisineId(cuisineId);

    dispatch({ type: FETCH_RECIPES_BY_CUISINE_ID, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getRecipes = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchRecipes;

    dispatch({ type: FETCH_RECIPES, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getRecipe = (recipeId) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchRecipe(recipeId);

    dispatch({ type: FETCH_RECIPE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createRecipe = (recipeData, history) => async (dispatch) => {
  try {
    const { data } = await api.createRecipe(recipeData);

    history.push(`/recipes/${data._id}`);

    dispatch({ type: CREATE_RECIPE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateRecipe = (id, recipe, history) => async (dispatch) => {
  try {
    const { data } = await api.updateRecipe(id, recipe);

    history.push(`/recipes/${data._id}`);

    dispatch({ type: UPDATE_RECIPE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteRecipe = (recipeId) => async (dispatch) => {
  try {
    await api.deleteRecipe(recipeId);

    dispatch({ type: DELETE_RECIPE, payload: recipeId });
  } catch (error) {
    console.log(error);
  }
};

export const searchRecipe = (searchValue) => {
  return { type: SEARCH_RECIPE, payload: searchValue };
};
