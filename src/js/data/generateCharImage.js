import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../constants";


/**
 * canvas 2d contexts store
 * @type {Map<String, CanvasRenderingContext2D>}
 */
const canvasCtxs = new Map();

/**
 *
 * @param {String} char charater
 * @param {String} id canvas ID
 */
export default function generateCharImage(char, type) {
    //compose the ID of the canvas of the char and type
    const canvasId = `${type}-${char}`;
    //create corresponding canvas if not found
    if (!canvasCtxs.has(canvasId)) {
        const canvas = document.createElement("canvas");
        canvas.setAttribute("id", canvasId);
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        const ctx = canvas.getContext("2d");
        canvasCtxs.set(canvasId, ctx);
    }
    const ctx = canvasCtxs.get(canvasId);

    //background
    const gradient = ctx.createLinearGradient(0, 0, CANVAS_HEIGHT, CANVAS_HEIGHT);
    gradient.addColorStop(0, "lightgray");
    gradient.addColorStop(1, "white");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_HEIGHT, CANVAS_HEIGHT);

    //draw lines
    ctx.strokeStyle = "black";
    for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.round(Math.random() * CANVAS_HEIGHT), 0);
        ctx.lineTo(Math.round(Math.random() * CANVAS_HEIGHT), CANVAS_HEIGHT);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, Math.round(Math.random() * CANVAS_HEIGHT));
        ctx.lineTo(CANVAS_HEIGHT, Math.round(Math.random() * CANVAS_HEIGHT));
        ctx.stroke();
    }

    //char
    ctx.fillStyle = "black";
    const fontSIze = `${Math.floor(Math.random() * 10) + 30}px`;
    const fontFamily = ["Courier", "Palatino"][Math.floor(Math.random() * 2)];
    const fontBold = Math.random() < 0.5 ? "bold" : "";
    ctx.font = `${fontBold} ${fontSIze} ${fontFamily}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(char, CANVAS_HEIGHT / 2, CANVAS_HEIGHT / 2, CANVAS_HEIGHT);

    return ctx.getImageData(0, 0, CANVAS_HEIGHT, CANVAS_HEIGHT);
}
