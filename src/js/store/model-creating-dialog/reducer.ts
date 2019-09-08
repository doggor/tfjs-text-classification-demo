import State from "./state";
import Types, { ModelCreatingDialogAction } from "./types";

export default function(state = new State(), action: ModelCreatingDialogAction): State {
    switch (action.type) {
        case Types.OPEN:
            return { ...state, isOpened: true };
        case Types.CLOSE:
            return { ...state, isOpened: false };
        case Types.SET_TEXT:
            return { ...state, text: action.payload.text };
        case Types.SET_STRUCT:
            return { ...state, struct: action.payload.struct };
        case Types.SET_LAST_ACTION:
            return { ...state, lastAction: action.payload.action };
        default:
            return state;
    }
}
