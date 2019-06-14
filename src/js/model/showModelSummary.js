import * as tfvis from "@tensorflow/tfjs-vis";

export default async function showModelSummary(model) {
    //show model summary
    await tfvis.show.modelSummary(
        {
            name: "Model Layers",
            tab: "Model",
        },
        model,
    );

    //show layer summaryies
    for (let i in model.layers) {
        await tfvis.show.layer({ name: model.layers[i].name, tab: "Model" }, model.getLayer(null, i));
    }
}
