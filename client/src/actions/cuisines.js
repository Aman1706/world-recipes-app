import {
  FETCH_CUISINES,
  CUISINE_START_LOADING,
  CUISINE_END_LOADING,
} from "../constants/actionTypes";

import * as api from "../api/index";

export const getCuisines = () => async (dispatch) => {
  try {
    dispatch({ type: CUISINE_START_LOADING });
    const { data } = await api.fetchCuisines;

    dispatch({ type: FETCH_CUISINES, payload: data });
    dispatch({ type: CUISINE_END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
