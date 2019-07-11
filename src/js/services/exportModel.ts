import * as tf from "@tensorflow/tfjs";

export default async function exportModel(model: tf.LayersModel, modelName: string) {
    await model.save(`downloads://${modelName}`);
}
