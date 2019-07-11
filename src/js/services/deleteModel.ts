import * as tf from "@tensorflow/tfjs";

export default function deleteModel(modelName: string) {
    return tf.io.removeModel(modelName);
}
