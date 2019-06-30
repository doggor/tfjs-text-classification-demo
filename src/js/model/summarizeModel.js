import { LayersModel } from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";


/**
 * @param {LayersModel} model
 */
export default async function summarizeModel(model) {
    //show model summary
    await tfvis.show.modelSummary(
        {
            name: "Model Layers",
            tab: "Model",
        },
        model,
    );

    //show layer summaries
    for (let i in model.layers) {
        await tfvis.show.layer({ name: model.layers[i].name, tab: "Model" }, model.getLayer(null, i));
    }
}
