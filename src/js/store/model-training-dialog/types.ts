enum Types {
    OPEN = "OPEN_MODEL_TRAINING_DIALOG",
    CLOSE = "CLOSE_MODEL_TRAINING_DIALOG",
    SET_EPOCHS = "SET_MODEL_TRAINING_DIALOG_EPOCHS",
    SET_LAST_ACTION = "SET_MODEL_TRAINING_DIALOG_LAST_ACTION",
}

export default Types;

export interface OpenModelTrainingDialogAction {
    type: Types.OPEN;
}

export interface CloseModelTrainingDialogAction {
    type: Types.CLOSE;
}

export interface SetModelTrainingDialogEpochsAction {
    type: Types.SET_EPOCHS;
    payload: { epochs: number };
}

export interface SetModelTrainingDialogLastActionAction {
    type: Types.SET_LAST_ACTION;
    payload: { action: "confirm" | "cancel" };
}

export type ModelTrainingDialogAction = OpenModelTrainingDialogAction | CloseModelTrainingDialogAction | SetModelTrainingDialogEpochsAction | SetModelTrainingDialogLastActionAction;
