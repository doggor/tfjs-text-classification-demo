import State from "./state";
import Types, { ModelNamingDialogAction } from "./types";

export default function(state = new State(), action: ModelNamingDialogAction): State {
    switch (action.type) {
        case Types.OPEN:
            return { ...state, isOpened: true };
        case Types.CLOSE:
            return { ...state, isOpened: false };
        case Types.SET_TEXT:
            return { ...state, text: action.payload.text };
        case Types.SET_LAST_ACTION:
            return { ...state, lastAction: action.payload.action };
        default:
            return state;
    }
}
