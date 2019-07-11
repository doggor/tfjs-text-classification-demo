import { useDispatch, useStore } from "react-redux";
import { openModelTrainingDialog } from "../store/model-training-dialog/actions";
import { Store } from "../store";

export default function useModelTrainingDialog() {
    const dispatch = useDispatch();
    const store = useStore() as Store;

    return () => {
        dispatch(openModelTrainingDialog());

        return new Promise<number>(resolve => {
            const unsubscribe = store.subscribe(() => {
                const { isOpened, epochs, lastAction } = store.getState().modelTrainingDialog;
                if (!isOpened) {
                    unsubscribe();
                    resolve(lastAction === "confirm" ? epochs : null);
                }
            });
        });
    };
}
