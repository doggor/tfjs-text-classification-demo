import * as tf from "@tensorflow/tfjs";
import { CHARS, BATCH_SIZE, CANVAS_WIDTH, CANVAS_HEIGHT } from "../constants";
import { LayersModel } from "@tensorflow/tfjs";


/**
 * @param {String} modelName
 * @return {Promise<LayersModel>}
 */
export default async function createModel(modelName) {
    const model = tf.sequential({
        layers: [
            tf.layers.conv2d({ name: "conv1", kernelSize: [5, 5], strides: 1, filters: 24, useBias: false, activation: "relu", inputShape: [CANVAS_WIDTH, CANVAS_HEIGHT, 1], batchSize: BATCH_SIZE }),
            tf.layers.maxPooling2d({ poolSize: [2, 2] }),
            tf.layers.conv2d({ name: "conv2", kernelSize: [3, 3], strides: 1, filters: 24, useBias: false, activation: "relu" }),
            tf.layers.maxPooling2d({ poolSize: [2, 2] }),
            tf.layers.flatten(),
            tf.layers.dense({ name: "dense1", units: CHARS.length, useBias: false, activation: "softmax" }),
        ],
    });

    const storeUrl = `indexeddb://${modelName}`;
    await model.save(storeUrl);

    return model;
}
