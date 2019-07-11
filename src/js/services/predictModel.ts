import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import { CHARS, CANVAS_WIDTH, CANVAS_HEIGHT } from "../constants";
import getDataset from "../data/getDataset";

function tensor2char(tensor: tf.Tensor<tf.Rank.R1>) {
    return CHARS[tensor.argMax().dataSync()[0]];
}

export default async function predictModel(model: tf.LayersModel) {
    //area to place the result
    const drawArea = tfvis.visor().surface({
        name: "Prediction",
        tab: "Prediction",
    }).drawArea;
    //clear previous results
    while (drawArea.firstChild) {
        drawArea.removeChild(drawArea.firstChild);
    }

    //get a set of data and iterate it
    await getDataset("predict").forEachAsync(data => {
        //do predictions
        const { xs, ys } = data as { xs: tf.Tensor<tf.Rank.R3>; ys: tf.Tensor<tf.Rank.R2> };
        const predictions = (model.predict(xs) as tf.Tensor<tf.Rank.R2>).unstack().map(tensor2char);

        //convert answers from tensor back by charaters
        const chars = ys.unstack().map(tensor2char);

        for (let i = 0; i < chars.length; i++) {
            const canvas = document.createElement("canvas");
            canvas.setAttribute("width", `${CANVAS_WIDTH}`);
            canvas.setAttribute("height", `${CANVAS_HEIGHT}`);

            //fill canvas
            const imageTensor = xs.slice([i, 0], [1, xs.shape[1]]).reshape<tf.Rank.R2>([CANVAS_WIDTH, CANVAS_HEIGHT]);
            tf.browser.toPixels(imageTensor, canvas);

            const label = document.createElement("span");
            label.style.color = chars[i] === predictions[i] ? "green" : "red";
            label.innerText = predictions[i];

            const predictCase = document.createElement("span");
            predictCase.className = "predict-case";
            predictCase.appendChild(canvas);
            predictCase.appendChild(label);

            drawArea.appendChild(predictCase);
        }
    });
}
