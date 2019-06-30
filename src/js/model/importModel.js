import * as tf from "@tensorflow/tfjs";


/**
 * @param {File} jsonFile
 * @param {File} weightFile
 * @param {String} modelName
 */
export default async function importModel(jsonFile, weightFile, modelName) {
    const io = tf.io.browserFiles([jsonFile, weightFile]);
    const model = await tf.loadLayersModel(io);

    const storeUrl = `indexeddb://${modelName}`;
    await model.save(storeUrl);

    return model;
}
