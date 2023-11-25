exports.generateText = function ({ canvas, ctx }, text, { fontSize, leftStart, color, position, bold }) {
    ctx.fillStyle = color

    do {
        ctx.font = `${bold && 500} ${fontSize}px Inter`
        fontSize -= 1 // Decrease the font size
    } while (ctx.measureText(text).width > canvas.width / 2 - leftStart)

    const textMetrics = ctx.measureText(text)

    const textHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent

    if (position === 'center') {
        ctx.fillText(text, leftStart, (canvas.height - textHeight) / 2 + textMetrics.actualBoundingBoxAscent)
    } else if (position === 'bottom') {
        console.log(textHeight, canvas.height)
        ctx.fillText(text, leftStart, canvas.height - leftStart)
    } else {
        console.log([textHeight / 2, leftStart])
        ctx.fillText(text, leftStart, textHeight / 1.3 + leftStart)
    }
}
