import * as tf from "@tensorflow/tfjs";
import * as React from "react";
import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Radio from "@material-ui/core/Radio";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import restoreModelList from "../services/restoreModelList";
import { AppState } from "../store";
import { updateModelList, selectModel } from "../store/model-list/actions";
import deleteModel from "../services/deleteModel";
import summarizeModel from "../services/summarizeModel";

export default function ModelList() {
    const modelList = useSelector((state: AppState) => state.modelList.list);
    const selectedModel = useSelector((state: AppState) => state.modelList.selected);

    const dispatch = useDispatch();

    //init: load model list
    useEffect(() => {
        (async () => {
            dispatch(updateModelList(await restoreModelList()));
        })();
    }, []);

    const onItemClicked = useCallback(
        (modelName: string) => {
            (async () => {
                dispatch(selectModel(modelName));
                const model = await tf.loadLayersModel(modelName);
                await summarizeModel(model);
            })();
        },
        [dispatch]
    );

    const onDeleteBtnClicked = useCallback(
        (model: string) => {
            (async () => {
                await deleteModel(model);
                dispatch(updateModelList(await restoreModelList()));
            })();
        },
        [dispatch]
    );

    return (
        <List>
            {modelList.map(model => {
                return (
                    <ListItem key={model} dense button onClick={() => onItemClicked(model)}>
                        <ListItemIcon>
                            <Radio color="primary" edge="start" checked={model === selectedModel} tabIndex={-1} disableRipple />
                        </ListItemIcon>
                        <ListItemText primary={model} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={() => onDeleteBtnClicked(model)}>
                                <DeleteForeverIcon color="error" />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                );
            })}
        </List>
    );
}
