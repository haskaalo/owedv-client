import { combineReducers } from "redux";
import error from "./error";
import profile from "./profile";

const combinedReducer = combineReducers({error, profile});

export default combinedReducer;
