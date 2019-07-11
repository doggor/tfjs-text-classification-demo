import Types, { UpdateModelListAction, SelectModelAction } from "./types";

export function updateModelList(modelList: string[]): UpdateModelListAction {
    return {
        type: Types.UPDATE_MODEL_LIST,
        payload: {
            list: modelList,
        },
    };
}

export function selectModel(modelName: string): SelectModelAction {
    return {
        type: Types.SELECT_MODEL,
        payload: {
            selected: modelName,
        },
    };
}
