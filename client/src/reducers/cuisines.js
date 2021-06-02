import {
  FETCH_CUISINES,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";

const cuisineReducer = (state = { isLoading: true, cuisines: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_CUISINES:
      return { ...state, cuisines: action.payload };
    default:
      return state;
  }
};

export default cuisineReducer;
