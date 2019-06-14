import $ from "jquery";
import { CHARS } from "../constants";
import generateCharImage from "../data/generateCharImage";

//setup canvases for training
export default function prepareCanvases() {
    const $traningContainer = $("#traning-canvas-container");
    const $validatingContainer = $("#validating-canvas-container");
    const $predictingContainer = $("#predicting-canvas-container");
    for (let char of CHARS) {
        $traningContainer.append(`<canvas id="canvas-train-${char}" width="50" height="50"></canvas>`);
        generateCharImage(char, `canvas-train-${char}`); //create sample
        $validatingContainer.append(`<canvas id="canvas-valid-${char}" width="50" height="50"></canvas>`);
        generateCharImage(char, `canvas-valid-${char}`); //create sample
        $predictingContainer.append(`<span class="predict-case"><canvas id="canvas-predict-${char}" width="50" height="50"></canvas><span id="result-predict-${char}"></span></span>`);
        generateCharImage(char, `canvas-predict-${char}`); //create sample
    }
}
