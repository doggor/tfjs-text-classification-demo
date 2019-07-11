import State from "./state";
import Types, { ModelTrainingDialogAction } from "./types";

export default function(state = new State(), action: ModelTrainingDialogAction): State {
    switch (action.type) {
        case Types.OPEN:
            return { ...state, isOpened: true };
        case Types.CLOSE:
            return { ...state, isOpened: false };
        case Types.SET_EPOCHS:
            return { ...state, epochs: action.payload.epochs };
        case Types.SET_LAST_ACTION:
            return { ...state, lastAction: action.payload.action };
        default:
            return state;
    }
}
