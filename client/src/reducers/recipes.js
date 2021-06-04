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

const recipeReducers = (
  state = { isLoading: true, recipes: [], searchRecipes: [] },
  action
) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_RECIPES_BY_CUISINE_ID:
      return {
        ...state,
        recipes: action.payload,
        searchRecipes: action.payload,
      };
    case FETCH_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        searchRecipes: action.payload,
      };
    case FETCH_RECIPE:
      return { ...state, recipe: action.payload };
    case CREATE_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
        searchRecipes: [...state.recipes, action.payload],
      };
    case UPDATE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.map((recipe) =>
          recipe._id === action.payload._id ? action.payload : recipe
        ),
        searchRecipes: state.recipes.map((recipe) =>
          recipe._id === action.payload._id ? action.payload : recipe
        ),
      };
    case DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(
          (recipe) => recipe._id !== action.payload
        ),
        searchRecipes: state.recipes.filter(
          (recipe) => recipe._id !== action.payload
        ),
      };
    case SEARCH_RECIPE:
      return {
        ...state,
        searchRecipes: state.recipes.filter((recipe) =>
          recipe.name.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    default:
      return state;
  }
};

export default recipeReducers;
