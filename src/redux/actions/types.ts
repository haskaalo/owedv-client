export enum ActionTypes {
    VIEW_PROFILE = "[profile] view profile",
    REMOVE_PROFILE = "[profile] hide profile",

    SET_ERROR = "[error] set error",
    REMOVE_ERROR = "[error] remove error",
}

type FunctionType = (...args: any[]) => any;
type ActionsObjects = {[actionKey: string]: FunctionType};
export type ActionsUnion<A extends ActionsObjects> = ReturnType<A[keyof A]>;
