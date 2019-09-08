import { useDispatch, useStore } from "react-redux";
import { openModelCreatingDialog, setModelCreatingDialogText, setModelCreatingDialogStruct } from "../store/model-creating-dialog/actions";
import { Store } from "../store";

export default function useModelCreatingDialog() {
    const dispatch = useDispatch();
    const store = useStore() as Store;

    return (defaultName = "") => {
        dispatch(setModelCreatingDialogText(defaultName || `model_${Date.now()}`));
        dispatch(openModelCreatingDialog());

        return new Promise<[string, string]>(resolve => {
            const unsubscribe = store.subscribe(() => {
                const { isOpened, text, struct, lastAction } = store.getState().modelCreatingDialog;
                if (!isOpened) {
                    unsubscribe();

                    resolve(lastAction === "confirm" ? [text, struct] : null);

                    //reset
                    dispatch(setModelCreatingDialogText(""));
                    dispatch(setModelCreatingDialogStruct(""));
                }
            });
        });
    };
}
