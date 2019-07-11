import State from "./state";
import Types, { ModelListAction } from "./types";

export default function(state = new State, action: ModelListAction): State {
    switch (action.type) {
        case Types.UPDATE_MODEL_LIST:
            return { ...state, list: action.payload.list };
        case Types.SELECT_MODEL:
            return { ...state, selected: action.payload.selected };
        default:
            return state;
    }
}
