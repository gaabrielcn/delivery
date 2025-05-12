const searchInput = document.getElementById("searchInput"); // Corrigido para "searchInput"
const fruitsSelect = document.getElementById("fruits");
const vegetablesSelect = document.getElementById("vegetables");
const quantityInput = document.getElementById("quantity");
const priceDisplay = document.getElementById("price");
const addToCartButton = document.getElementById("addToCart");
const cartList = document.getElementById("cartList");
const totalPriceDisplay = document.getElementById("totalPrice");

let totalPrice = 0;
let selectedProduct = null;

const products = {
    fruits: [
        { name: "Maçã", pricePerKg: 10.00 },
        { name: "Banana", pricePerKg: 5.00 },
        { name: "Laranja", pricePerKg: 8.00 }
    ],
    vegetables: [
        { name: "Cenoura", pricePerKg: 6.00 },
        { name: "Batata", pricePerKg: 4.00 },
        { name: "Tomate", pricePerKg: 7.00 }
    ]
};

// Função para filtrar produtos
function filterProducts() {
    const input = searchInput.value.toLowerCase();
    const results = document.getElementById("searchResults");
    results.innerHTML = ""; // Limpa resultados anteriores

    // Filtra frutas
    products.fruits.forEach(product => {
        if (product.name.toLowerCase().includes(input)) {
            const li = document.createElement("li");
            li.textContent = product.name;
            li.onclick = function() {
                selectProduct(product);
            };
            results.appendChild(li);
        }
    });

    // Filtra legumes
    products.vegetables.forEach(product => {
        if (product.name.toLowerCase().includes(input)) {
            const li = document.createElement("li");
            li.textContent = product.name;
            li.onclick = function() {
                selectProduct(product);
            };
            results.appendChild(li);
        }
    });
}

// Função para selecionar o produto
function selectProduct(product) {
    selectedProduct = product;
    searchInput.value = product.name;
    quantityInput.value = "";
    priceDisplay.textContent = `Preço: R$ ${product.pricePerKg.toFixed(2)}`;
    document.getElementById("searchResults").innerHTML = ""; // Limpa os resultados
    document.querySelector(".quantity-box").style.display = "block"; // Exibe a caixa de quantidade
}

// Adiciona o evento de input ao campo de busca
searchInput.addEventListener("input", filterProducts);


// Função para adicionar produto ao carrinho
function addProductToCart() {
    const quantity = parseFloat(quantityInput.value);

    // Adiciona logs para depuração
    console.log("Produto selecionado:", selectedProduct);
    console.log("Quantidade:", quantity);

    // Verifica se um produto foi selecionado e se a quantidade é válida
    if (selectedProduct && !isNaN(quantity) && quantity > 0) {
        // Lógica para adicionar o produto ao carrinho
        const cartItem = document.createElement("li");
        const itemTotalPrice = (selectedProduct.pricePerKg * quantity).toFixed(2);
        cartItem.textContent = `${quantity} kg de ${selectedProduct.name} - R$ ${itemTotalPrice}`; // Adiciona o nome do produto e a quantidade
        cartList.appendChild(cartItem); // Adiciona o item à lista do carrinho

        // Atualiza o total
        totalPrice += parseFloat(itemTotalPrice);
        totalPriceDisplay.innerText = `Total: R$ ${totalPrice.toFixed(2)}`;

        // Limpa o campo de quantidade e oculta o campo
        quantityInput.value = "";
        priceDisplay.textContent = ""; // Limpa o preço
        selectedProduct = null; // Reseta o produto selecionado
    } else {
        // Aqui você pode remover o alerta e usar um console.log para depuração
        console.log("Produto não selecionado ou quantidade inválida.");
        alert("Por favor, selecione um produto e informe uma quantidade válida.");
    }
}

// Adiciona o evento de clique ao botão "Adicionar ao Carrinho"
addToCartButton.addEventListener("click", addProductToCart);

// Função para mostrar o formulário de entrega
function showDeliveryForm() {
    document.getElementById("deliveryForm").style.display = "block";
}

// Função para finalizar a compra
function finalizePurchase() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const paymentMethod = document.getElementById("paymentMethod").value;

    // Aqui você pode adicionar a lógica para processar a compra
    console.log("Compra finalizada com sucesso!", { name, phone, address, paymentMethod });
    alert("Obrigado pela sua compra, " + name + "!");
}















// Atualiza o preço conforme a quantidade
function updatePrice() {
    const selectedProduct = fruitsSelect.value || vegetablesSelect.value;
    const quantity = parseFloat(quantityInput.value);

    if (selectedProduct && quantity > 0) {
        let price = 0;
        if (fruitsSelect.value) {
            price = products.fruits.find(p => p.name === selectedProduct).pricePerKg;
        } else if (vegetablesSelect.value) {
            price = products.vegetables.find(p => p.name === selectedProduct).pricePerKg;
        }
        priceDisplay.innerText = `Preço: R$ ${price * quantity}`;
    } else {
        priceDisplay.innerText = "";
    }
}

// Adiciona o produto ao carrinho

function saveCart() {
    const cartItems = [];
    cartList.querySelectorAll("li").forEach(item => {
        const [name, quantity, price] = item.innerText.split(" - ");
        cartItems.push({ name, quantity: parseFloat(quantity), price: parseFloat(price.replace('R$', '').replace(',', '.')) });
    });
    localStorage.setItem("cart", JSON.stringify(cartItems));
}
function loadCart() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.forEach(item => {
        const cartItem = document.createElement("li");
        cartItem.innerHTML = `${item.name} - ${item.quantity}kg - R$ ${item.price.toFixed(2)} <button class="remove" onclick="removeFromCart(this)">🗑️</button>`;
        cartList.appendChild(cartItem);
        totalPrice += item.price;
    });
    totalPriceDisplay.innerText = `Total: R$ ${totalPrice.toFixed(2)}`;
    if (cartItems.length > 0) {
        cartList.style.display = "block";
    }
}

// Chame a função loadCart ao carregar a página
window.onload = loadCart;


function addToCart() {
    const selectedProduct = fruitsSelect.value || vegetablesSelect.value;
    const quantity = parseFloat(quantityInput.value);

    if (selectedProduct && quantity > 0) {
        let price = 0;
        let productDetails = {};
        if (fruitsSelect.value) {
            productDetails = products.fruits.find(p => p.name === selectedProduct);
            price = productDetails.pricePerKg;
        } else if (vegetablesSelect.value) {
            productDetails = products.vegetables.find(p => p.name === selectedProduct);
            price = productDetails.pricePerKg;
        }

        // Criação do item do carrinho
        const cartItem = document.createElement("li");
        cartItem.innerHTML = `${productDetails.name} - ${quantity}kg - R$ ${price * quantity}
            <button class="remove" onclick="removeFromCart(this)">🗑️</button>`;
        cartList.appendChild(cartItem);

        // Torna a lista de compras visível
        cartList.style.display = "block";  // Garante que a lista de compras apareça

        // Atualiza o total
        totalPrice += price * quantity;
        totalPriceDisplay.innerText = `Total: R$ ${totalPrice.toFixed(2)}`;

        saveCart();

        // Limpa os campos após adicionar
        fruitsSelect.value = "";
        vegetablesSelect.value = "";
        quantityInput.value = "";
        priceDisplay.innerText = "";
    } else {
        alert("Por favor, selecione um produto e informe a quantidade.");
    }
}

// Remove um item do carrinho
function removeFromCart(button) {
    const cartItem = button.parentElement;
    const price = parseFloat(cartItem.innerText.split(' - ')[2].split(' ')[1].replace('R$', '').replace(',', '.'));
    totalPrice -= price;
    totalPriceDisplay.innerText = `Total: R$ ${totalPrice.toFixed(2)}`;
    cartItem.remove();
    saveCart();

    // Se a lista de compras estiver vazia, oculta ela
    if (cartList.children.length === 0) {
        cartList.style.display = "none";
    }
}

// Valida a seleção de apenas frutas ou legumes
function validateSelection() {
    if (fruitsSelect.value && vegetablesSelect.value) {
        alert("Selecione apenas frutas ou legumes, não ambos.");
        fruitsSelect.value = "";
    }
}

// Adiciona eventos de seleção para validar a escolha
fruitsSelect.addEventListener("change", () => {
    vegetablesSelect.value = ""; // Limpa o outro select
    validateSelection();
    updatePrice();
});
vegetablesSelect.addEventListener("change", () => {
    fruitsSelect.value = ""; // Limpa o outro select
    validateSelection();
    updatePrice();
});

// Atualiza o preço conforme a quantidade digitada
quantityInput.addEventListener("input", updatePrice);

// Adiciona o produto ao carrinho ao clicar no botão
addToCartButton.addEventListener("click", addToCart);

// Função para buscar produtos dinamicamente
searchInput.addEventListener("input", () => {
    const searchQuery = searchInput.value.toLowerCase();

    // Filtra frutas e legumes com base no texto digitado
    const filteredFruits = products.fruits.filter(product => product.name.toLowerCase().includes(searchQuery));
    const filteredVegetables = products.vegetables.filter(product => product.name.toLowerCase().includes(searchQuery));

    // Atualiza as opções nas caixas de seleção
    updateSelectOptions(fruitsSelect, filteredFruits);
    updateSelectOptions(vegetablesSelect, filteredVegetables);
});

// Função para atualizar as opções nas caixas de seleção
function updateSelectOptions(selectElement, products) {
    // Limpa as opções existentes
    selectElement.innerHTML = `<option value="">Selecione</option>`;
    
    // Adiciona as opções filtradas
    products.forEach(product => {
        const option = document.createElement("option");
        option.value = product.name;
        option.textContent = product.name;
        selectElement.appendChild(option);
    });
    
}
