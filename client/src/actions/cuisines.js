import {
  FETCH_CUISINES,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";

import * as api from "../api/index";

export const getCuisines = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchCuisines;

    dispatch({ type: FETCH_CUISINES, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
