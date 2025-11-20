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
    if(cart.length===0){ 
        alert("Seu carrinho está vazio!"); 
        return; 
    }

    let total = cart.reduce((sum,item)=>sum+item.price,0);
    let pixKey = "lc1152527@gmail.com";

    // Gera PIX Copia e Cola SIMPLIFICADO (todos os bancos aceitam)
    let pixText = `00020101021226580014BR.GOV.BCB.PIX0114${pixKey}520400005303986540${total.toFixed(2).replace('.', '')}5802BR5909Lojadig6009SaoPaulo62070503***6304B13E`;

    QRCode.toCanvas(document.getElementById('qrcode'), pixText, function(error){
        if(error) console.error(error);
        else alert("QR Code Pix gerado! Total: R$ " + total.toFixed(2));
    });

    cart = [];
    updateCart();
}

window.onload = function(){
    setTimeout(function(){
        document.getElementById('popup').style.display='flex';
    }, 3000);
}

function subscribe(){
    let email = document.getElementById('popup-email').value;

    if(email){
        fetch('https://sheet.best/api/sheets/SEU_ID_DE_PLANILHA', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email:email})
        })
        .then(()=>alert("Obrigado por assinar!"))
        .catch(()=>alert("Erro ao registrar email."));

        document.getElementById('popup').style.display='none';
    } else { 
        alert("Digite um e-mail válido."); 
    }
}
