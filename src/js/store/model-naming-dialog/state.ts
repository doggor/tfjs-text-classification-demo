export default class ModelNamingDialogState {
    isOpened: boolean = false;
    text: string = "";
    lastAction: "confirm" | "cancel" = "cancel";
}
