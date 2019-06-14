import * as tf from "@tensorflow/tfjs";
import { CHARS, BATCH_SIZE } from "../constants";
import generateCharImage from "./generateCharImage";

/**
 *
 * @param {String} type "train" or "valid"
 */
export default function getDataset(type) {
    const xs = tf.data.generator(function*() {
        for (let char of CHARS) {
            const imageData = generateCharImage(char, `canvas-${type}-${char}`);
            const tensors = tf.browser.fromPixels(imageData, 1);
            yield tf
                .scalar(255)
                .sub(tensors)
                .div(tf.scalar(255)); //normalize
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
