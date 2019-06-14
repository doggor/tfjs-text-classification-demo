/**
 *
 * @param {String} char charater
 * @param {String} id DOM ID
 */
export default function generateCharImage(char, domId) {
    const ctx = document.getElementById(domId).getContext("2d", { alpha: false });
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    //background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "lightgray");
    gradient.addColorStop(1, "white");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    //draw lines
    ctx.strokeStyle = "black";
    for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.round(Math.random() * width), 0);
        ctx.lineTo(Math.round(Math.random() * width), height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, Math.round(Math.random() * height));
        ctx.lineTo(width, Math.round(Math.random() * height));
        ctx.stroke();
    }

    //char
    ctx.fillStyle = "black";
    const fontSIze = `${Math.floor(Math.random() * 10) + 30}px`;
    const fontFamily = ["serif", "Courier"][Math.floor(Math.random() * 2)];
    const fontBold = Math.random() < 0.5 ? "bold" : "";
    ctx.font = `${fontBold} ${fontSIze} ${fontFamily}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(char, width / 2, height / 2, width);

    return ctx.getImageData(0, 0, width, height);
}
