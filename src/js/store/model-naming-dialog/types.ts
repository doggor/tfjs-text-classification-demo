enum Types {
    OPEN = "OPEN_MODEL_NAMING_DIALOG",
    CLOSE = "CLOSE_MODEL_NAMING_DIALOG",
    SET_TEXT = "SET_MODEL_NAMING_DIALOG_TEXT",
    SET_LAST_ACTION = "SET_MODEL_NAMING_DIALOG_LAST_ACTION",
}

export default Types;

export interface OpenModelNamingDialogAction {
    type: Types.OPEN;
}

export interface CloseModelNamingDialogAction {
    type: Types.CLOSE;
}

export interface SetModelNamingDialogTextAction {
    type: Types.SET_TEXT;
    payload: { text: string };
}

export interface SetModelNamingDialogLastActionAction {
    type: Types.SET_LAST_ACTION;
    payload: { action: "confirm" | "cancel" };
}

export type ModelNamingDialogAction = OpenModelNamingDialogAction | CloseModelNamingDialogAction | SetModelNamingDialogTextAction | SetModelNamingDialogLastActionAction;
