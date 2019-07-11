import { useDispatch, useStore } from "react-redux";
import { openModelImportingDialog, setModelImportingDialogModelName, setModelImportingDialogJsonFile, setModelImportingDialogWeightFile } from "../store/model-importing-dialog/actions";
import { Store } from "../store";

export default function useModelImportingDialog() {
    const dispatch = useDispatch();
    const store = useStore() as Store;

    return () => {
        dispatch(openModelImportingDialog());

        return new Promise<{ modelName: string; jsonFile: File; weightFile: File }>(resolve => {
            const unsubscribe = store.subscribe(() => {
                const { isOpened, jsonFile, weightFile, modelName, lastAction } = store.getState().modelImportingDialog;
                if (!isOpened) {
                    unsubscribe();

                    resolve(lastAction === "confirm" ? { modelName, jsonFile, weightFile } : null);

                    //reset
                    dispatch(setModelImportingDialogModelName(""));
                    dispatch(setModelImportingDialogJsonFile(null));
                    dispatch(setModelImportingDialogWeightFile(null));
                }
            });
        });
    };
}
