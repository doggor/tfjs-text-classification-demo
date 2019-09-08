import * as React from "react";
import { useCallback, useMemo, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { AppState } from "../store";
import { setModelCreatingDialogText, closeModelCreatingDialog, setModelCreatingDialogLastAction, setModelCreatingDialogStruct } from "../store/model-creating-dialog/actions";
import { defaultModelStruct } from "../services/createModel";

export default function ModelCreatingDialog() {
    const isOpened = useSelector((state: AppState) => state.modelCreatingDialog.isOpened);
    const text = useSelector((state: AppState) => state.modelCreatingDialog.text);
    const struct = useSelector((state: AppState) => state.modelCreatingDialog.struct);

    const dispatch = useDispatch();

    const structPlaceholder = useMemo(() => JSON.stringify(struct || defaultModelStruct, null, 2), [struct]);

    const onTextChanged = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            dispatch(setModelCreatingDialogText(event.target.value));
        },
        [dispatch]
    );

    const onStructChanged = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            dispatch(setModelCreatingDialogStruct(event.target.value));
        },
        [dispatch]
    );

    const onConfirmed = useCallback(() => {
        dispatch(setModelCreatingDialogLastAction("confirm"));
        dispatch(closeModelCreatingDialog());
    }, [dispatch]);

    const onCancelled = useCallback(() => {
        dispatch(setModelCreatingDialogLastAction("cancel"));
        dispatch(closeModelCreatingDialog());
    }, [dispatch]);

    return (
        <Dialog color="primary" open={isOpened} onClose={onCancelled}>
            <DialogTitle>Name the model</DialogTitle>
            <DialogContent>
                <DialogContentText>Please provide a name for the model:</DialogContentText>
                <TextField autoFocus margin="dense" label="Model Name" type="text" fullWidth required value={text} onChange={onTextChanged} />
                <TextField margin="normal" label="Model Defination" placeholder={structPlaceholder} type="text" fullWidth multiline value={struct} InputLabelProps={{shrink: true }} onChange={onStructChanged} />
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
