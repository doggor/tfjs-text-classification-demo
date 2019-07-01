import "babel-polyfill";
import $ from "jquery";
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import createModel from "./model/createModel";
import { getModel } from "./model/currentModel";
import evaluteModel from "./model/evaluteModel";
import exportModel from "./model/exportModel";
import importModel from "./model/importModel";
import listModels from "./model/listModels";
import predictFromModel from "./model/predictFromModel";
import saveModel from "./model/saveModel";
import summarizeModel from "./model/summarizeModel";
import trainModel from "./model/trainModel";

//init
$(document).ready(async function init() {
    //wait until tfjs is ready
    await tf.ready();

    //restore models from storage
    listModels();

    //disable #use-cpu if webgl is not available
    if (tf.getBackend() !== "webgl") {
        $("#use-cpu").prop("checked", true);
        $("#use-cpu").prop("disabled", true);
    }
});


//show visor
$("#show-visor-btn").click(function() {
    tfvis.visor().open();
});


//import model
$("#import-model-btn").click(async function() {
    try {
        const jsonFile = $("#model-import-json-input").prop("files")[0];
        const weightFile = $("#model-import-weight-input").prop("files")[0];
        const modelName = prompt("Please provide a name for the model:", jsonFile.name.replace(/\.json$/, ""));

        await importModel(jsonFile, weightFile, modelName);

        await listModels();
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
});


//create a new model
$("#new-model-btn").click(async function() {
    const modelName = prompt("Please provide a name for the new model:", `model_${Date.now()}`);
    const model = await createModel(modelName);

    await listModels();

    await summarizeModel(model);
});


//train model
$("#start-traning-btn").click(async function() {
    const model = getModel();
    if (!model) {
        alert("Please select a model first!");
        return;
    }
    const epochs = parseInt($("#epochs-input").val()) || 100;
    const backend = $("#use-cpu").prop("checked") ? "cpu" : "webgl";

    await trainModel(model, epochs, backend);
});


//save current model to storage
$("#save-model-btn").click(async function() {
    const modelName = prompt("Please provide a name for the model:", `model_${Date.now()}`);

    await saveModel(getModel(), modelName);

    await listModels();
});


//download current model
$("#export-model-btn").click(async function() {
    const modelName = prompt("Please provide a prefix for the model files:", `model_${Date.now()}`);
    await exportModel(getModel());
});


$("#eval-model-btn").click(async function() {
    const model = getModel();
    if (!model) {
        alert("Please select a model first!");
        return;
    }

    await evaluteModel(model);
});


$("#start-predict-btn").click(async function() {
    const model = getModel();
    if (!model) {
        alert("Please select a model first!");
        return;
    }

    predictFromModel(model);
});
