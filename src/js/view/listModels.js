import $ from "jquery";
import * as tf from "@tensorflow/tfjs";
import { setModel } from "../model/currentModel";
import showModelSummary from "../model/showModelSummary";

//list stored models in local storage | indexeddb
export default async function listModels() {
    const models = await tf.io.listModels();
    $("#model-list .model-option").remove();
    for (let url in models) {
        const $input = $(`<input type="radio" name="use-model" value=${url}>`).change(async function() {
            const model = await tf.loadLayersModel(url);
            setModel(model);
            showModelSummary(model);
        });
        const $removeBtn = $(`<button class="remove-model-btn"></button>`).click(async function() {
            if (window.confirm(`Remove ${url} ?`)) {
                await tf.io.removeModel(url);
                await listModels(); //refresh
            }
        });
        $("#model-list").append(
            $(`<li class="model-option"></li>`)
                .append($(`<label>${url}</label>`).prepend($input))
                .append($removeBtn),
        );
    }
}
