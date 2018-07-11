import { ActionTypes, ActionsUnion } from "./types";

export interface IError {
    message: string;
    statusCode?: number;
}

export const SetError = (error: IError) => ({type: ActionTypes.SET_ERROR as typeof ActionTypes.SET_ERROR, payload: error});
export type SetErrorAction = ReturnType<typeof SetError>;

export const RemoveError = () => ({type: ActionTypes.REMOVE_ERROR as typeof ActionTypes.REMOVE_ERROR});
export type RemoveErrorAction = ReturnType<typeof SetError>;

const ErrorActions = {  SetError, RemoveError };

export type ErrorActions = ActionsUnion<typeof ErrorActions>;
