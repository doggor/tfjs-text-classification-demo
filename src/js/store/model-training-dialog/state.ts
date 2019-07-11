export default class ModelTrainingDialogState {
    isOpened: boolean = false;
    epochs: number = 10;
    lastAction: "confirm" | "cancel" = "cancel";
}
