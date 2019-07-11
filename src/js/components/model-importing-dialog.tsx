import * as React from "react";
import { useCallback, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { AppState } from "../store";
import { setModelImportingDialogJsonFile, setModelImportingDialogWeightFile, closeModelImportingDialog, setModelImportingDialogModelName, setModelImportingDialogLastAction } from "../store/model-importing-dialog/actions";
import useStyles from "../hooks/use-styles";

export default function ModelImportingDialog() {
    const isOpened = useSelector((state: AppState) => state.modelImportingDialog.isOpened);
    const jsonFile = useSelector((state: AppState) => state.modelImportingDialog.jsonFile);
    const weightFile = useSelector((state: AppState) => state.modelImportingDialog.weightFile);
    const modelName = useSelector((state: AppState) => state.modelImportingDialog.modelName);
    const classes = useStyles({});
    const dispatch = useDispatch();

    const onJsonFileSelected = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            dispatch(setModelImportingDialogJsonFile(event.target.files[0]));
            //also set the model name from file name
            dispatch(setModelImportingDialogModelName(event.target.files[0].name.replace(/\..*$/, "")));
        },
        [dispatch]
    );

    const onWeightFileSelected = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            dispatch(setModelImportingDialogWeightFile(event.target.files[0]));
        },
        [dispatch]
    );

    const onModelNameChanged = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            dispatch(setModelImportingDialogModelName(event.target.value));
        },
        [dispatch]
    );

    const onConfirmed = useCallback(() => {
        dispatch(setModelImportingDialogLastAction("confirm"));
        dispatch(closeModelImportingDialog());
    }, [dispatch]);

    const onCancelled = useCallback(() => {
        dispatch(setModelImportingDialogLastAction("cancel"));
        dispatch(closeModelImportingDialog());
    }, [dispatch]);

    return (
        <Dialog color="primary" open={isOpened} onClose={onCancelled}>
            <DialogTitle>Import Model</DialogTitle>
            <DialogContent>
                <label className={classes.dropArea}>
                    {jsonFile ? (
                        <h4>
                            JSON File: <i>{jsonFile.name}</i>
                        </h4>
                    ) : (
                        <h4>Please drop or click here to add model JSON file</h4>
                    )}
                    <input type="file" accept="text/json" required onChange={onJsonFileSelected} />
                </label>
                <label className={classes.dropArea}>
                    {weightFile ? (
                        <h4>
                            Weight File: <i>{weightFile.name}</i>
                        </h4>
                    ) : (
                        <h4>Please drop or click here to add model weight file</h4>
                    )}
                    <input type="file" required onChange={onWeightFileSelected} />
                </label>
                <TextField margin="dense" label="Model Name" type="text" fullWidth required value={modelName} onChange={onModelNameChanged} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancelled}>Cancel</Button>
                <Button color="primary" disabled={!jsonFile || !weightFile} onClick={onConfirmed}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}
