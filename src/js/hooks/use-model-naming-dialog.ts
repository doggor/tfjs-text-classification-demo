import { useDispatch, useStore } from "react-redux";
import { openModelNamingDialog, setModelNamingDialogText } from "../store/model-naming-dialog/actions";
import { Store } from "../store";

export default function useModelNamingDialog() {
    const dispatch = useDispatch();
    const store = useStore() as Store;

    return (defaultName = "") => {
        dispatch(setModelNamingDialogText(defaultName || `model_${Date.now()}`));
        dispatch(openModelNamingDialog());

        return new Promise<string>(resolve => {
            const unsubscribe = store.subscribe(() => {
                const { isOpened, text, lastAction } = store.getState().modelNamingDialog;
                if (!isOpened) {
                    unsubscribe();

                    resolve(lastAction === "confirm" ? text : null);

                    //reset
                    dispatch(setModelNamingDialogText(""));
                }
            });
        });
    };
}
