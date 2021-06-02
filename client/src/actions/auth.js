import { AUTH } from "../constants/actionTypes";

import * as api from "../api/index";

import Swal from "sweetalert2";

export const signIn = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    history.push("/");
  } catch (error) {
    Swal.fire({
      icon: "error",
      text: `${error.response.data.message}`,
      confirmButtonColor: "#0a5ffe",
    });
    console.log(error);
  }
};

export const signUp = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    history.push("/");
  } catch (error) {
    Swal.fire({
      icon: "error",
      text: `${error.response.data.message}`,
      confirmButtonColor: "#0a5ffe",
    });
    console.log(error);
  }
};
