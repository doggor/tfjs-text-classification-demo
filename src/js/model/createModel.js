import * as tf from "@tensorflow/tfjs";
import { CHARS, BATCH_SIZE } from "../constants";

export default function createModel() {
    const model = tf.sequential({
        layers: [
            tf.layers.conv2d({ name: "conv1", kernelSize: [4, 4], strides: 2, filters: 24, useBias: false, activation: "relu", inputShape: [50, 50, 1], batchSize: BATCH_SIZE }),
            tf.layers.maxPooling2d({ poolSize: [2, 2] }),
            tf.layers.flatten(),
            tf.layers.dense({ name: "dense2", units: CHARS.length, useBias: false, activation: "softmax" }),
        ],
    });

    return model;
}
