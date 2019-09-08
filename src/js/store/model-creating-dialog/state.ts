export default class ModelNamingDialogState {
    isOpened: boolean = false;
    text: string = "";
    struct: string = "";
    lastAction: "confirm" | "cancel" = "cancel";
}
