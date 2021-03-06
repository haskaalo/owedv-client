import { ActionTypes, ActionsUnion } from "./types";

export interface IProfile {
    player: {
        name: string;
        id: string;
        fullname: string;
        icon: string;
        platform: string;
    };
    role_queue: Array<{
        role: string;
        role_icon: string;
        sr: string;
        icon: string;
    }>;
    shotcaller: string;
    teammate: string;
    sportsmanship: string;
    total: string;
    level: string;
    error: string;
}

export const ViewProfile = (profile: IProfile) => ({type: ActionTypes.VIEW_PROFILE as ActionTypes.VIEW_PROFILE, payload: profile});
export type ViewProfileAction = ReturnType<typeof ViewProfile>;

export const RemoveProfile = () => ({type: ActionTypes.REMOVE_PROFILE as ActionTypes.REMOVE_PROFILE});
export type RemoveProfileAction = ReturnType<typeof RemoveProfile>;

const ProfileActions = { ViewProfile, RemoveProfile };

export type ProfileActions = ActionsUnion<typeof ProfileActions>;
