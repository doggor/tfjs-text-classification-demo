import { LayersModel } from "@tensorflow/tfjs";


/**
 *
 * @param {LayersModel} model
 */
export default async function exportModel(model) {
    const modelName = prompt("Please provide a prefix for the model files:", `model_${Date.now()}`);
    await model.save(`downloads://${modelName}`);
}
