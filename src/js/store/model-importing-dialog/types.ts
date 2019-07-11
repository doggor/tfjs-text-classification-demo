enum Types {
    OPEN = "OPEN_MODEL_IMPORTING_DIALOG",
    CLOSE = "CLOSE_MODEL_IMPORTING_DIALOG",
    SET_JSON_FILE = "SET_MODEL_IMPORTING_DIALOG_JSON_FILE",
    SET_WEIGHT_FILE = "SET_MODEL_IMPORTING_DIALOG_WEIGHT_FILE",
    SET_MODEL_NAME = "SET_MODEL_IMPORTING_DIALOG_MODEL_NAME",
    SET_LAST_ACTION = "SET_MODEL_IMPORTING_DIALOG_LAST_ACTION",
}

export default Types;

export interface OpenModelImportingDialogAction {
    type: Types.OPEN;
}

export interface CloseModelImportingDialogAction {
    type: Types.CLOSE;
}

export interface SetModelImportingDialogJsonFileAction {
    type: Types.SET_JSON_FILE;
    payload: { file: File };
}

export interface SetModelImportingDialogWeightFileAction {
    type: Types.SET_WEIGHT_FILE;
    payload: { file: File };
}

export interface SetModelImportingDialogModelNameAction {
    type: Types.SET_MODEL_NAME;
    payload: { name: string };
}

export interface SetModelImportingDialogLastActionAction {
    type: Types.SET_LAST_ACTION;
    payload: { action: "confirm" | "cancel" };
}

export type ModelNamingDialogAction = OpenModelImportingDialogAction | CloseModelImportingDialogAction | SetModelImportingDialogJsonFileAction | SetModelImportingDialogWeightFileAction | SetModelImportingDialogModelNameAction | SetModelImportingDialogLastActionAction;
