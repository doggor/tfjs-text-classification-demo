import * as React from "react";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import store, { AppState } from "../store";
import { setModelTrainingDialogEpochs, closeModelTrainingDialog, setModelTrainingDialogLastAction } from "../store/model-training-dialog/actions";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function modelTrainingDialog() {
    const isOpened = useSelector((state: AppState) => state.modelTrainingDialog.isOpened);
    const epochs = useSelector((state: AppState) => state.modelTrainingDialog.epochs);

    const dispatch = useDispatch<typeof store.dispatch>();

    const onTextChanged = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setModelTrainingDialogEpochs(~~event.target.value));
        },
        [dispatch]
    );

    const onConfirmed = useCallback(() => {
        dispatch(setModelTrainingDialogLastAction("confirm"));
        dispatch(closeModelTrainingDialog());
    }, [dispatch]);

    const onCancelled = useCallback(() => {
        dispatch(setModelTrainingDialogLastAction("cancel"));
        dispatch(closeModelTrainingDialog());
    }, [dispatch]);

    return (
        <Dialog color="primary" open={isOpened} onClose={onCancelled}>
            <DialogTitle>Train Model</DialogTitle>
            <DialogContent>
                <DialogContentText>Please enter to training epochs:</DialogContentText>
                <TextField autoFocus margin="dense" label="Epochs" type="number" fullWidth required value={epochs} onChange={onTextChanged} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancelled}>Cancel</Button>
                <Button color="primary" onClick={onConfirmed}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}
