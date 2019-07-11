import Types from "./types";

export function openModelImportingDialog() {
    return {
        type: Types.OPEN,
    };
}

export function closeModelImportingDialog() {
    return {
        type: Types.CLOSE,
    };
}

export function setModelImportingDialogJsonFile(jsonFile: File) {
    return {
        type: Types.SET_JSON_FILE,
        payload: {
            file: jsonFile,
        },
    };
}

export function setModelImportingDialogWeightFile(weightFile: File) {
    return {
        type: Types.SET_WEIGHT_FILE,
        payload: {
            file: weightFile,
        },
    };
}

export function setModelImportingDialogModelName(modelName: string) {
    return {
        type: Types.SET_MODEL_NAME,
        payload: {
            name: modelName,
        },
    };
}

export function setModelImportingDialogLastAction(action: "confirm" | "cancel") {
    return {
        type: Types.SET_LAST_ACTION,
        payload: {
            action,
        },
    };
}
