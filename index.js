'strict mode'
const data = require('./config.json')
const { promises } = require('fs')
const { join } = require('path')
const { createCanvas } = require('@napi-rs/canvas')
const { generateQR } = require('./generateQR')
const { generateText } = require('./generateText')
const multiplier = data.width / 450

const canvasQR = createCanvas(data.width, data.width)
generateQR(canvasQR, `szipo://shoe/${data.id}`, data.width)

const canvas = createCanvas(data.width * 2, data.width)
const ctx = canvas.getContext('2d')

ctx.drawImage(canvasQR, data.width, 0, data.width, data.width)

ctx.fillStyle = 'white'
ctx.fillRect(0, 0, data.width, data.width)

generateText({ canvas, ctx }, 'Szipő', { fontSize: 36 * multiplier, leftStart: 50 * multiplier, color: '#000000', bold: true })
generateText({ canvas, ctx }, data.numericalID, { fontSize: 260 * multiplier, leftStart: 45 * multiplier, color: '#000000', position: 'center' })
generateText({ canvas, ctx }, data.position, { fontSize: 30 * multiplier, leftStart: 50 * multiplier, color: '#747474', position: 'bottom' })

ctx.fillStyle = '#979797'
ctx.fillRect(50 * multiplier, 95 * multiplier, 30 * multiplier, 4.5 * multiplier)

async function main() {
    const pngData = await canvas.encode('png')
    await promises.writeFile(join(__dirname, 'label.png'), pngData)
}

main()
