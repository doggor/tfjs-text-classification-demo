import { LayersModel } from "@tensorflow/tfjs";


/**
 * @param {LayersModel} model
 * @param {String} modelName
 */
export default async function saveModel(model, modelName) {
    await model.save(`indexeddb://${modelName}`);
}
