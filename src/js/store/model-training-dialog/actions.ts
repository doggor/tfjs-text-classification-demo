import Types from "./types";

export function openModelTrainingDialog() {
    return {
        type: Types.OPEN,
    };
}

export function closeModelTrainingDialog() {
    return {
        type: Types.CLOSE,
    };
}

export function setModelTrainingDialogEpochs(epochs: number) {
    return {
        type: Types.SET_EPOCHS,
        payload: {
            epochs,
        },
    };
}

export function setModelTrainingDialogLastAction(action: "confirm" | "cancel") {
    return {
        type: Types.SET_LAST_ACTION,
        payload: {
            action,
        },
    };
}
