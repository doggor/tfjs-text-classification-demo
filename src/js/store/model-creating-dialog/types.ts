enum Types {
    OPEN = "OPEN_MODEL_CREATING_DIALOG",
    CLOSE = "CLOSE_MODEL_CREATING_DIALOG",
    SET_TEXT = "SET_MODEL_CREATING_DIALOG_TEXT",
    SET_STRUCT = "SET_MODEL_CREATING_DIALOG_STRUCT",
    SET_LAST_ACTION = "SET_MODEL_CREATING_DIALOG_LAST_ACTION",
}

export default Types;

export interface OpenModelCreatingDialogAction {
    type: Types.OPEN;
}

export interface CloseModelCreatingDialogAction {
    type: Types.CLOSE;
}

export interface SetModelCreatingDialogTextAction {
    type: Types.SET_TEXT;
    payload: { text: string };
}

export interface SetModelCreatingDialogStructAction {
    type: Types.SET_STRUCT;
    payload: { struct: string };
}

export interface SetModelCreatingDialogLastActionAction {
    type: Types.SET_LAST_ACTION;
    payload: { action: "confirm" | "cancel" };
}

export type ModelCreatingDialogAction = OpenModelCreatingDialogAction | CloseModelCreatingDialogAction | SetModelCreatingDialogTextAction | SetModelCreatingDialogStructAction | SetModelCreatingDialogLastActionAction;
