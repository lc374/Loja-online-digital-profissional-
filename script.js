function checkoutPix() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let total = cart.reduce((sum, item) => sum + item.price, 0);
    let pixKey = "lc1152527@gmail.com";

    let payload = 
        "000201" +
        "26580014BR.GOV.BCB.PIX" +
        "01" + ("14" + pixKey).length + "14" + pixKey +
        "52040000" +
        "5303986" +
        "540" + total.toFixed(2).replace(".", "") +
        "5802BR" +
        "5911LUIZ CARLOS" +
        "6010ALAGOAS BR" +
        "62070503***";

    // Função que calcula CRC16
    function crc16(str) {
        let polynomial = 0x1021;
        let crc = 0xFFFF;

        for (let i = 0; i < str.length; i++) {
            crc ^= str.charCodeAt(i) << 8;

            for (let j = 0; j < 8; j++) {
                if ((crc & 0x8000) !== 0) {
                    crc = (crc << 1) ^ polynomial;
                } else {
                    crc <<= 1;
                }
                crc &= 0xffff;
            }
        }
        return crc.toString(16).toUpperCase().padStart(4, "0");
    }

    let pixCode = payload + "6304" + crc16(payload);

    QRCode.toCanvas(document.getElementById("qrcode"), pixCode, function (error) {
        if (error) console.error(error);
        else alert("QR Code Pix gerado com sucesso! Total: R$" + total.toFixed(2));
    });

    cart = [];
    updateCart();
}
