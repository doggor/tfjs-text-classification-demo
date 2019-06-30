import * as tf from "@tensorflow/tfjs";
import { LayersModel } from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import compileModel from "./compileModel";
import getDataset from "../data/getDataset";
import { CHARS } from "../constants";


/**
 * @param {LayersModel} model
 */
export default async function evaluteModel(model) {
    //make sure the model is well compiled
    compileModel(model);

    //create 10 set of data for evalution
    const dataset = new Array(10)
        .fill(null)
        .map(() => getDataset("valid"))
        .reduce((p, c) => p.concatenate(c));

    //collection predictions
    /**@type {tf.Tensor[]} */
    const labelCollection = [];
    /**@type {tf.Tensor[]} */
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
}
