import { IProfile, ProfileActions } from "../actions/profile";
import { ActionTypes } from "../actions/types";

const initialState: IProfile = null;

const profile = (state = initialState, action: ProfileActions): IProfile => {
    switch (action.type) {
        case ActionTypes.VIEW_PROFILE:
            return action.payload;
        case ActionTypes.REMOVE_PROFILE:
            return null;
        default:
            return state;
    }
};

export default profile;
