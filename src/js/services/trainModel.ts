import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import getDataset, { clearDataCache } from "../data/getDataset";
import compileModel from "./compileModel";

export default async function trainModel(model: tf.LayersModel, epochs: number, backend = "webgl") {
    tf.setBackend(backend);

    compileModel(model);

    const trainingDataset = getDataset("train");
    const validatingDataset = getDataset("valid", 1, true);

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

    clearDataCache();
}
