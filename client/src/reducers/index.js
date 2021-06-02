import { combineReducers } from "redux";

import cuisines from "./cuisines";
import auth from "./auth";
import recipes from "./recipes";

export const reducers = combineReducers({ cuisines, auth, recipes });
