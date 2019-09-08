import * as tf from "@tensorflow/tfjs";
import { CHARS, BATCH_SIZE, CANVAS_WIDTH, CANVAS_HEIGHT } from "../constants";

export type ModelStruct = { [layerType: string]: { [name: string]: any } }[];

export const defaultModelStruct: ModelStruct = [
    { "conv2d": { name: "conv1", kernelSize: [5, 5], strides: 1, filters: 24, useBias: false, activation: "relu" } },
    { "maxPooling2d": { poolSize: [2, 2] } },
    { "conv2d": { name: "conv2", kernelSize: [3, 3], strides: 1, filters: 24, useBias: false, activation: "relu" } },
    { "maxPooling2d": { poolSize: [2, 2] } },
    { "flatten": {} },
    { "dense": { name: "dense1", useBias: false, activation: "softmax" } },
];

export default async function createModel(modelName: string, struct: ModelStruct = defaultModelStruct) {
    const layers = struct.map((layer, idx, arr) => {
        const layerType = Object.keys(layer)[0];
        const props = layer[layerType];
        //attach input shape and batch size for the first layer
        if (idx === 0) {
            props.inputShape = [CANVAS_WIDTH, CANVAS_HEIGHT, 1];
            props. batchSize = BATCH_SIZE;
        }
        //attach output units fot the last layer
        else if (idx + 1 === arr.length) {
            props.units = CHARS.length;
        }
        return tf.layers[layerType](props)
    });

    const model = tf.sequential({ layers });

    const storeUrl = `indexeddb://${modelName}`;
    await model.save(storeUrl);

    return model;
}
