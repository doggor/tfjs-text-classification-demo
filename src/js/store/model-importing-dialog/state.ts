export default class ModelImportingDialogState {
    isOpened: boolean = false;
    jsonFile: File = null;
    weightFile: File = null;
    modelName: string = "";
    lastAction: "confirm" | "cancel" = "cancel";
}
