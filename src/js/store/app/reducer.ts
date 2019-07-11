import State from "./state";
import Types, { AppAction } from "./types";

export default function(state = new State(), action: AppAction): State {
    switch (action.type) {
        case Types.SET_LOADING:
            return { ...state, isLoading: action.payload.isLoading };
        default:
            return state;
    }
}
