import Types from "./types";

export function openModelCreatingDialog() {
    return {
        type: Types.OPEN,
    };
}

export function closeModelCreatingDialog() {
    return {
        type: Types.CLOSE,
    };
}

export function setModelCreatingDialogText(text: string) {
    return {
        type: Types.SET_TEXT,
        payload: {
            text,
        },
    };
}

export function setModelCreatingDialogStruct(struct: string) {
    return {
        type: Types.SET_STRUCT,
        payload: {
            struct,
        }
    }
}

export function setModelCreatingDialogLastAction(action: "confirm" | "cancel") {
    return {
        type: Types.SET_LAST_ACTION,
        payload: {
            action,
        },
    };
}
