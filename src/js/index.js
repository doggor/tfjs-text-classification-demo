import "babel-polyfill";
import $ from "jquery";
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import createModel from "./model/createModel";
import listModels from "./view/listModels";
import trainModel from "./model/trainModel";
import showModelSummary from "./model/showModelSummary";
import { getModel } from "./model/currentModel";
import getDataset from "./data/getDataset";
import { CHARS } from "./constants";

$(document).ready(async function() {

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

//import model
$("#import-model-btn").click(async function() {
    try {
        const jsonFile = $("#model-import-json-input").prop("files")[0];
        const weightFile = $("#model-import-weight-input").prop("files")[0];
        const io = tf.io.browserFiles([jsonFile, weightFile]);
        const model = await tf.loadLayersModel(io);
        const modelName = prompt("Please provide a name for the model:", jsonFile.name.replace(/\.json$/, ""));
        const storeUrl = `indexeddb://${modelName}`;
        await model.save(storeUrl);
        await listModels();
        $(`input[name="use-model"][value="${storeUrl}"]`)
            .prop("checked", true)
            .change();
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
});

//create a new model
$("#new-model-btn").click(async function() {
    const modelName = prompt("Please provide a name for the new model:", `model_${Date.now()}`);
    const model = createModel();
    const storeUrl = `indexeddb://${modelName}`;
    await model.save(storeUrl);
    await listModels();
    $(`input[name="use-model"][value="${storeUrl}"]`)
        .prop("checked", true)
        .change();
    await showModelSummary(model);
    window.currentModel = model; //set to global
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
    trainModel(model, epochs, backend);
});

//save current model to storage
$("#save-model-btn").click(async function() {
    const modelName = prompt("Please provide a name for the model:", `model_${Date.now()}`);
    await getModel().save(`indexeddb://${modelName}`);
    await listModels();
});

//download current model
$("#export-model-btn").click(async function() {
    const modelName = prompt("Please provide a prefix for the model files:", `model_${Date.now()}`);
    await getModel().save(`downloads://${modelName}`);
});

$("#eval-model-btn").click(async function() {
    const model = getModel();
    if (!model) {
        alert("Please select a model first!");
        return;
    }
    //make sure the model is well compiled
    model.compile({
        optimizer: "adam",
        loss: "categoricalCrossentropy",
        metrics: ["accuracy"],
    });
    //create 10 set of data
    const dataset = new Array(10)
        .fill(null)
        .map(() => getDataset("valid"))
        .reduce((p, c) => p.concatenate(c));
    //collection predictions
    const labelCollection = [];
    const predictionCollection = [];
    await dataset.forEachAsync(async data => {
        labelCollection.push(data.ys.argMax([-1]));
        predictionCollection.push(model.predict(data.xs).argMax([-1]));
    });
    const labels = tf.concat(labelCollection);
    const predictions = tf.concat(predictionCollection);
    //show summary
    const classes = CHARS.split("");
    tfvis.show.perClassAccuracy({ name: "Accuracy", tab: "Evaluation" }, await tfvis.metrics.perClassAccuracy(labels, predictions), classes);
    tfvis.render.confusionMatrix(
        { name: "Confusion Matrix", tab: "Evaluation" },
        {
            values: await tfvis.metrics.confusionMatrix(labels, predictions),
            tickLabels: classes,
        },
    );
});

$("#start-predict-btn").click(async function() {
    const model = getModel();
    if (!model) {
        alert("Please select a model first!");
        return;
    }

    //function to convert ouput tensor to char
    const tensor2char = tensor => CHARS[tensor.argMax().dataSync()[0]];

    //area to place the result
    const $drawArea = $(tfvis.visor().surface({
        name: 'Prediction',
        tab: 'Prediction'
    }).drawArea).empty();

    getDataset("predict").forEachAsync(data => {
        const chars = data.ys.unstack().map(tensor2char);
        const predictions = model
            .predict(data.xs)
            .unstack()
            .map(tensor2char);
        for (let i = 0; i < chars.length; i++) {
            //append canvas dom and predicted value
            const $canvas = $(`<canvas width="50" height="50"></canvas>`)
            $(`<span class="predict-case"></span>`)
                .append($canvas)
                .append(
                    $(`<span>${predictions[i]}</span>`)
                        .css("color", chars[i] === predictions[i] ? "green" : "red"))
                .appendTo($drawArea);
            //fill canvas
            const imageTensor = data.xs.slice([i, 0], [1, data.xs.shape[1]]).reshape([50, 50, 1]);
            tf.browser.toPixels(imageTensor, $canvas[0]);
        }
    });
});
