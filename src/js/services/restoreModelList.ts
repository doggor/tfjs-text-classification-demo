import * as tf from "@tensorflow/tfjs";

/**
 * return list of model names from localstorage/indexeddb
 */
export default async function restoreModelList() {
    return Object.keys(await tf.io.listModels())
}
