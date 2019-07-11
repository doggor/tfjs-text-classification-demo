import * as React from "react";
import { useCallback, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { AppState } from "../store";
import { setModelNamingDialogText, closeModelNamingDialog, setModelNamingDialogLastAction } from "../store/model-naming-dialog/actions";

export default function ModelNamingDialog() {
    const isOpened = useSelector((state: AppState) => state.modelNamingDialog.isOpened);
    const text = useSelector((state: AppState) => state.modelNamingDialog.text);

    const dispatch = useDispatch();

    const onTextChanged = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            dispatch(setModelNamingDialogText(event.target.value));
        },
        [dispatch]
    );

    const onConfirmed = useCallback(() => {
        dispatch(setModelNamingDialogLastAction("confirm"));
        dispatch(closeModelNamingDialog());
    }, [dispatch]);

    const onCancelled = useCallback(() => {
        dispatch(setModelNamingDialogLastAction("cancel"));
        dispatch(closeModelNamingDialog());
    }, [dispatch]);

    return (
        <Dialog color="primary" open={isOpened} onClose={onCancelled}>
            <DialogTitle>Name the model</DialogTitle>
            <DialogContent>
                <DialogContentText>Please provide a name for the model:</DialogContentText>
                <TextField autoFocus margin="dense" label="Model Name" type="text" fullWidth required value={text} onChange={onTextChanged} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancelled}>Cancel</Button>
                <Button color="primary" onClick={onConfirmed} disabled={!text}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}
