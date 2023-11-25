var QRCode = require('qrcode')
exports.generateQR = async function (canvas, text, width) {
    try {
        await QRCode.toCanvas(canvas, text, { margin: 3, width })
    } catch (err) {
        console.error(err)
    }
}
