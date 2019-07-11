import * as tf from "@tensorflow/tfjs";

export default function saveModel(model: tf.LayersModel, modelName: string) {
    return model.save(modelName);
}
