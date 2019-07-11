import State from "./state";
import Types, { ModelNamingDialogAction } from "./types";

export default function(state = new State(), action: ModelNamingDialogAction): State {
    switch (action.type) {
        case Types.OPEN:
            return { ...state, isOpened: true };
        case Types.CLOSE:
            return { ...state, isOpened: false };
        case Types.SET_JSON_FILE:
            return { ...state, jsonFile: action.payload.file };
        case Types.SET_WEIGHT_FILE:
            return { ...state, weightFile: action.payload.file };
        case Types.SET_MODEL_NAME:
            return { ...state, modelName: action.payload.name };
        case Types.SET_LAST_ACTION:
            return { ...state, lastAction: action.payload.action };
        default:
            return state;
    }
}
