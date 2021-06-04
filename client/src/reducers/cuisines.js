import {
  FETCH_CUISINES,
  CUISINE_START_LOADING,
  CUISINE_END_LOADING,
} from "../constants/actionTypes";

const cuisineReducer = (
  state = { isLoadingCuisine: true, cuisines: [] },
  action
) => {
  switch (action.type) {
    case CUISINE_START_LOADING:
      return { ...state, isLoadingCuisine: true };
    case CUISINE_END_LOADING:
      return { ...state, isLoadingCuisine: false };
    case FETCH_CUISINES:
      return { ...state, cuisines: action.payload };
    default:
      return state;
  }
};

export default cuisineReducer;
