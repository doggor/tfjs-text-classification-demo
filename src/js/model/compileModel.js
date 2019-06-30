import { LayersModel } from "@tensorflow/tfjs";


/**
 * @param {LayersModel} model
 */
export default function compileModel(model) {
    model.compile({
        optimizer: "adam",
        loss: "categoricalCrossentropy",
        metrics: ["accuracy"],
    });
}
