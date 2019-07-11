enum Types {
    SET_LOADING = "SET_APP_LOADING",
}

export default Types;

export interface SetAppLoadingAction {
    type: Types.SET_LOADING;
    payload: {
        isLoading: boolean;
    };
}

export type AppAction = SetAppLoadingAction;
