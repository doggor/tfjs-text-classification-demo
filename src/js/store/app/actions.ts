import Types from "./types";

export function setAppLoading(isLoading: boolean) {
    return {
        type: Types.SET_LOADING,
        payload: {
            isLoading,
        },
    };
}
