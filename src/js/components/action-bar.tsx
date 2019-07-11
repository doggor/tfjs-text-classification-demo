import * as tf from "@tensorflow/tfjs";
import * as React from "react";
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StylesProvider } from "@material-ui/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import useStyles from "../hooks/use-styles";
import useModelNamingDialog from "../hooks/use-model-naming-dialog";
import createModel from "../services/createModel";
import restoreModelList from "../services/restoreModelList";
import { updateModelList } from "../store/model-list/actions";
import { AppState } from "../store";
import useModelTrainingDialog from "../hooks/use-model-training-dialog";
import trainModel from "../services/trainModel";
import saveModel from "../services/saveModel";
import evaluteModel from "../services/evaluteModel";
import predictModel from "../services/predictModel";
import exportModel from "../services/exportModel";
import useModelImportingDialog from "../hooks/use-model-importing-dialog";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { setAppLoading } from "../store/app/actions";

export default function ActionBar() {
    const modelName = useSelector((state: AppState) => state.modelList.selected);
    const classes = useStyles({});
    const dispatch = useDispatch();

    const modelImportingPrompt = useModelImportingDialog();
    const modelNamingPrompt = useModelNamingDialog();
    const trainingEpochsPrompt = useModelTrainingDialog();

    const [GPUUsable, setGPUUsable] = useState(false); //is WebGL usable
    const [GPUEnabled, enableGPU] = useState(false); //whether should use WebGL for traning

    //init GPU setting
    tf.ready().then(() => {
        const canUseGPU = tf.getBackend() === "webgl";
        setGPUUsable(canUseGPU);
        //turn on if GPU available
        if (canUseGPU) {
            enableGPU(true);
        }
    });

    const onImportBtnClicked = useCallback(() => {
        (async () => {
            try {
                const result = await modelImportingPrompt();
                if (result) {
                    dispatch(setAppLoading(true));
                    const { modelName: name, jsonFile, weightFile } = result;
                    const io = tf.io.browserFiles([jsonFile, weightFile]);
                    const model = await tf.loadLayersModel(io);
                    await saveModel(model, `indexeddb://${name}`);
                    dispatch(updateModelList(await restoreModelList()));
                    dispatch(setAppLoading(false));
                }
            } catch (err) {
                console.error(err);
            }
        })();
    }, [dispatch, modelImportingPrompt]);

    const onExportBtnClicked = useCallback(() => {
        (async () => {
            try {
                const exportName = await modelNamingPrompt(modelName.replace(/^.*?:\/\//, ""));
                if (exportName) {
                    dispatch(setAppLoading(true));
                    const model = await tf.loadLayersModel(modelName);
                    await exportModel(model, exportName);
                    dispatch(setAppLoading(false));
                }
            } catch (err) {
                console.error(err);
            }
        })();
    }, [modelNamingPrompt, modelName]);

    const onNewBtnClicked = useCallback(() => {
        (async () => {
            try {
                const modelName = await modelNamingPrompt();
                if (modelName) {
                    dispatch(setAppLoading(true));
                    await createModel(modelName);
                    dispatch(updateModelList(await restoreModelList()));
                    dispatch(setAppLoading(false));
                }
            } catch (err) {
                console.error(err);
            }
        })();
    }, [dispatch, modelNamingPrompt]);

    const onTrainBtnClicked = useCallback(() => {
        (async () => {
            try {
                const epochs = await trainingEpochsPrompt();
                if (epochs) {
                    dispatch(setAppLoading(true));
                    const model = await tf.loadLayersModel(modelName);
                    await trainModel(model, epochs);
                    await saveModel(model, modelName);
                    dispatch(setAppLoading(false));
                }
            } catch (err) {
                console.error(err);
            }
        })();
    }, [modelName, trainingEpochsPrompt]);

    const onEvaluteBtnClicked = useCallback(() => {
        (async () => {
            try {
                dispatch(setAppLoading(true));
                const model = await tf.loadLayersModel(modelName);
                await evaluteModel(model);
                dispatch(setAppLoading(false));
            } catch (err) {
                console.error(err);
            }
        })();
    }, [modelName]);

    const onPredictBtnClicked = useCallback(() => {
        (async () => {
            try {
                dispatch(setAppLoading(true));
                const model = await tf.loadLayersModel(modelName);
                await predictModel(model);
                dispatch(setAppLoading(false));
            } catch (err) {
                console.error(err);
            }
        })();
    }, [modelName]);

    const toggleGPU = useCallback(() => {
        const newState = !GPUEnabled;
        tf.setBackend(newState ? "webgl" : "cpu");
        enableGPU(newState);
    }, [GPUEnabled, enableGPU]);

    return (
        <div>
            <ButtonGroup variant="contained" className={classes.spacing1}>
                <Button className={clsx(classes.fWhite, classes.bgAmber, classes.bgBlackHover)} onClick={onImportBtnClicked}>
                    Import
                </Button>
                <Button className={clsx(classes.fWhite, classes.bgOrange, classes.bgBlackHover)} disabled={!modelName} onClick={onExportBtnClicked}>
                    Export
                </Button>
            </ButtonGroup>
            <Button variant="contained" className={clsx(classes.spacing1, classes.fWhite, classes.bgLightGreen, classes.bgBlackHover)} onClick={onNewBtnClicked}>
                New
            </Button>
            <Button variant="contained" className={clsx(classes.spacing1, classes.fWhite, classes.bgBlue, classes.bgBlackHover)} disabled={!modelName} onClick={onTrainBtnClicked}>
                Train
            </Button>
            <ButtonGroup variant="contained" className={classes.spacing1}>
                <Button className={clsx(classes.fWhite, classes.bgPurple, classes.bgBlackHover)} disabled={!modelName} onClick={onEvaluteBtnClicked}>
                    Evaluate
                </Button>
                <Button className={clsx(classes.fWhite, classes.bgDeepPurple, classes.bgBlackHover)} disabled={!modelName} onClick={onPredictBtnClicked}>
                    Predict
                </Button>
            </ButtonGroup>
            <FormControlLabel control={<Switch disabled={!GPUUsable} checked={GPUEnabled} onChange={toggleGPU} value="gpu" color="primary" />} labelPlacement="start" label="GPU" />
        </div>
    );
}
