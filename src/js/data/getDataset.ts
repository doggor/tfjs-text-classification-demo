import * as tf from "@tensorflow/tfjs";
import { CHARS, BATCH_SIZE } from "../constants";
import generateCharImage from "./generateCharImage";

type DatesetType = "train" | "valid" | "predict";

const imageDataCache = new Map<string, ImageData>();

function getImageData(char: string, type: DatesetType, shouldCache: boolean) {
    const id = `${type}-${char}`;
    if (shouldCache && imageDataCache.has(id)) {
        return imageDataCache.get(id);
    } else {
        const imageData = generateCharImage(char, type);
        imageDataCache.set(id, imageData);
        return imageData;
    }
}

export default function getDataset(type: DatesetType, replication = 1, shouldCache = false) {
    const chars = CHARS.repeat(replication);

    const xs = tf.data.generator(function*() {
        for (let char of chars) {
            const imageData = getImageData(char, type, shouldCache);
            const tensors = tf.browser.fromPixels(imageData, 1);
            const normlized = tensors.div(tf.scalar(255));
            tensors.dispose();
            yield normlized;
        }
    });

    const labelTpl = new Array<number>(CHARS.length).fill(0);

    const ys = tf.data.generator(function*() {
        for (let i = 0; i < chars.length; i++) {
            const buf = Array.from(labelTpl);
            buf[i % CHARS.length] = 1;
            yield tf.tensor(buf);
        }
    });

    return (
        tf.data
            .zip({ xs, ys })
            // .shuffle(chars.length)
            .batch(BATCH_SIZE)
    );
}

export function clearDataCache() {
    imageDataCache.clear();
}
