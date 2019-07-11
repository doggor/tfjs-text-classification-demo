import * as tf from "@tensorflow/tfjs";

export default function compileModel(model: tf.LayersModel) {
    model.compile({
        optimizer: "adam",
        loss: "categoricalCrossentropy",
        metrics: ["accuracy"],
    });
}
