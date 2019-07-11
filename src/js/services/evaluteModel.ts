import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import compileModel from "./compileModel";
import getDataset from "../data/getDataset";
import { CHARS } from "../constants";

export default async function evaluteModel(model: tf.LayersModel) {
    //make sure the model is well compiled
    compileModel(model);

    //collection predictions
    const labelCollection: tf.Tensor<tf.Rank.R1>[] = [];
    const predictionCollection: tf.Tensor<tf.Rank.R1>[] = [];
    await getDataset("valid", 10).forEachAsync(async data => {
        const { xs, ys } = data as { xs: tf.Tensor<tf.Rank.R3>; ys: tf.Tensor<tf.Rank.R2> };
        labelCollection.push(ys.argMax<tf.Tensor<tf.Rank.R1>>());
        predictionCollection.push((model.predict(xs) as tf.Tensor<tf.Rank.R2>).argMax<tf.Tensor<tf.Rank.R1>>());
    });
    const labels = tf.concat(labelCollection);
    const predictions = tf.concat(predictionCollection);

    //show summary
    const classes = CHARS.split("");
    tfvis.show.perClassAccuracy(
        {
            name: "Accuracy",
            tab: "Evaluation",
        },
        await tfvis.metrics.perClassAccuracy(labels, predictions),
        classes
    );
    tfvis.render.confusionMatrix(
        { name: "Confusion Matrix", tab: "Evaluation" },
        {
            values: await tfvis.metrics.confusionMatrix(labels, predictions),
            tickLabels: classes,
        }
    );
}
