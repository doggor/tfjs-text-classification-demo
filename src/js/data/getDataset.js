import * as tf from "@tensorflow/tfjs";
import { CHARS, BATCH_SIZE } from "../constants";
import generateCharImage from "./generateCharImage";

/**
 * @type {Map<String, ImageData>}
 */
const imageDataCache = new Map();

/**
 * @param {String} char
 * @param {String} type
 * @param {Boolean} shouldCache
 */
function getImageData(char, type, shouldCache) {
    const id = `${type}-${char}`;
    if (shouldCache && imageDataCache.has(id)) {
        return imageDataCache.get(id);
    }
    else {
        const imageData = generateCharImage(char, type);
        imageDataCache.set(id, imageData);
        return imageData;
    }
}

/**
 * @param {String} type "train" or "valid"
 */
export default function getDataset(type, shouldCache = false) {
    const xs = tf.data.generator(function*() {
        for (let char of CHARS) {
            const imageData = getImageData(char, type, shouldCache);
            const tensors = tf.browser.fromPixels(imageData, 1);
            yield tensors.div(tf.scalar(255)); //normalize
        }
    });

    const ys = tf.data.generator(function*() {
        for (let i = 0; i < CHARS.length; i++) {
            const buf = tf.buffer([CHARS.length]);
            buf.set(1, i);
            yield buf.toTensor();
        }
    });

    return tf.data
        .zip({ xs, ys })
        .shuffle(CHARS.length)
        .batch(BATCH_SIZE);
}
