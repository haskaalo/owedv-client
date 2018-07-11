import { IError, ErrorActions } from "../actions/error";
import { ActionTypes } from "../actions/types";

const initialState: IError = null;

const error = (state = initialState, action: ErrorActions): IError => {
    switch (action.type) {
        case ActionTypes.SET_ERROR:
            return action.payload;
        case ActionTypes.REMOVE_ERROR:
            return initialState;
        default:
            return state;
    }
};

export default error;
