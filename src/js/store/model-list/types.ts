enum Types {
    UPDATE_MODEL_LIST = "UPDATE_MODEL_LIST",
    SELECT_MODEL = "SET_MODEL_LIST_DEFAULT_SELETED",
}

export default Types;

export interface UpdateModelListAction {
    type: Types.UPDATE_MODEL_LIST;
    payload: { list: string[] };
}

export interface SelectModelAction {
    type: Types.SELECT_MODEL;
    payload: { selected: string };
}

export type ModelListAction = UpdateModelListAction | SelectModelAction;
