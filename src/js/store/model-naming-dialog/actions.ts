import Types from "./types";

export function openModelNamingDialog() {
    return {
        type: Types.OPEN,
    };
}

export function closeModelNamingDialog() {
    return {
        type: Types.CLOSE,
    };
}

export function setModelNamingDialogText(text: string) {
    return {
        type: Types.SET_TEXT,
        payload: {
            text,
        },
    };
}

export function setModelNamingDialogLastAction(action: "confirm" | "cancel") {
    return {
        type: Types.SET_LAST_ACTION,
        payload: {
            action,
        },
    };
}
