import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import getDataset from "../data/getDataset";
import { LayersModel } from "@tensorflow/tfjs";
import compileModel from "./compileModel";


/**
 *
 * @param {LayersModel} model
 * @param {number} epochs
 * @param {'cpu'|'webgl'} backend
 */
export default async function trainModel(model, epochs, backend = "webgl") {
    tf.setBackend(backend);

    compileModel(model);

    const trainingDataset = getDataset("train");
    const validatingDataset = getDataset("valid", true);

    const graphUpdateCallbacks = tfvis.show.fitCallbacks(
        {
            name: "Acc / Loss",
            tab: "Training",
            styles: {
                height: "800px",
            },
        },
        ["loss", "val_loss", "acc", "val_acc"],
        { zoomToFitAccuracy: true, zoomToFit: true, callbacks: ["onEpochEnd"] },
    );

    await model.fitDataset(trainingDataset, {
        epochs,
        validationData: validatingDataset,
        callbacks: [graphUpdateCallbacks],
    });
}
