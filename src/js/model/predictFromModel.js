import * as tf from "@tensorflow/tfjs"
import { LayersModel } from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis"
import { CHARS, CANVAS_WIDTH, CANVAS_HEIGHT } from "../constants";
import getDataset from "../data/getDataset";


/**
 * function to convert ouput tensor to char
 * @param {tf.Tensor} tensor
 */
function tensor2char(tensor) {
    return CHARS[tensor.argMax().dataSync()[0]];
}


/**
 * @param {LayersModel} model
 */
export default async function predictFromModel(model) {
    //area to place the result
    const $drawArea = $(tfvis.visor().surface({
        name: 'Prediction',
        tab: 'Prediction',
    }).drawArea).empty();

    //get a set of data and iterate it
    await getDataset("predict").forEachAsync(data => {
        //do predictions
        const predictions = model.predict(data.xs).unstack().map(tensor2char);

        //convert answers from tensor back by charaters
        const chars = data.ys.unstack().map(tensor2char);

        for (let i = 0; i < chars.length; i++) {
            //append canvas dom and predicted value
            const $canvas = $(`<canvas width="${CANVAS_WIDTH}" height="${CANVAS_HEIGHT}"></canvas>`)
            $(`<span class="predict-case"></span>`)
                .append($canvas)
                .append(
                    $(`<span>${predictions[i]}</span>`)
                        .css("color", chars[i] === predictions[i] ? "green" : "red"))
                .appendTo($drawArea);

            //fill canvas
            const imageTensor = data.xs.slice([i, 0], [1, data.xs.shape[1]]).reshape([CANVAS_WIDTH, CANVAS_HEIGHT, 1]);
            tf.browser.toPixels(imageTensor, $canvas[0]);
        }
    });
}
