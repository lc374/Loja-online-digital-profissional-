
let cart = [];

function addToCart(name, price){
    cart.push({name, price});
    updateCart();
    alert(name + " adicionado ao carrinho!");
}

function updateCart(){
    let cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item=>{
        let li = document.createElement('li');
        li.textContent = `${item.name} - R$${item.price.toFixed(2)}`;
        cartItems.appendChild(li);
        total += item.price;
    });

    document.getElementById('cart-total').textContent = `Total: R$${total.toFixed(2)}`;
    document.getElementById('cart-count').textContent = cart.length;
}

function checkoutPix(){
    if(cart.length === 0){
        alert("Seu carrinho está vazio!");
        return;
    }

    let total = cart.reduce((sum,item)=>sum + item.price, 0);
    let pixKey = "lc1152527@gmail.com";

    // Valor formatado sem ponto
    let amount = total.toFixed(2).replace(".", "");

    // Tamanho do campo 54xx
    let size = amount.length.toString().padStart(2, "0");

    // BRCode corrigido
    let pixText = 
        `000201` +
        `26580014BR.GOV.BCB.PIX` +
        `01${pixKey.length}${pixKey}` +
        `52040000` +
        `5303986` +
        `54${size}${amount}` +
        `5802BR` +
        `5915Loja Digital` +
        `6009Sao Paulo` +
        `62070503***` +
        `6304ABCD`; // Simulação do CRC

    // Limpa QR code anterior
    document.getElementById('qrcode').innerHTML = "";

    QRCode.toCanvas(document.getElementById('qrcode'), pixText, function(error){
        if(error){
            console.error(error);
            alert("Erro ao gerar o QR Code Pix.");
        }
    });

    alert("QR Code gerado! Escaneie para pagar.");
}

window.onload = function(){
    setTimeout(function(){
        document.getElementById('popup').style.display = 'flex';
    }, 3000);
}

function subscribe(){
    let email = document.getElementById('popup-email').value;
    if(email){
        fetch('https://sheet.best/api/sheets/SEU_ID_DE_PLANILHA', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({email})
        })
        .then(()=> alert("Obrigado por assinar!"))
        .catch(()=> alert("Erro ao registrar email."));

        document.getElementById('popup').style.display = 'none';
    } 
    else {
        alert("Digite um e-mail válido.");
    }
}
