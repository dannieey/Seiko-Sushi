const cartContainer = document.getElementById('cart-items');
const summary = document.getElementById('cart-summary');
const emptyMsg = document.getElementById('empty-cart');
const totalDisplay = document.getElementById('total-price');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
    if (cart.length === 0) {
        summary.classList.add('hidden');
        emptyMsg.classList.remove('hidden');
        cartContainer.innerHTML = '';
        return;
    }

    emptyMsg.classList.add('hidden');
    summary.classList.remove('hidden');

    cartContainer.innerHTML = cart.map((item, index) => `
        <div class="flex items-center gap-6 bg-stone-800/30 p-4 rounded-2xl border border-stone-800">
            <img src="${item.image}" class="w-20 h-20 object-cover rounded-xl">
            <div class="flex-1">
                <h3 class="font-bold">${item.name}</h3>
                <p class="text-stone-500 text-sm">$${item.price}</p>
            </div>
            <button onclick="removeFromCart(${index})" class="text-stone-600 hover:text-red-600 transition">✕</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalDisplay.innerText = `$${total.toFixed(2)}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

async function checkout() {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!userData || !token) {
        alert("Пожалуйста, войдите в систему, чтобы оформить заказ.");
        window.location.href = 'login.html';
        return;
    }

    if (!cart || cart.length === 0) {
        alert("Ваша корзина пуста!");
        return;
    }

    const orderData = {
        orderType: 'delivery',
        items: cart.map(item => ({
            product: item._id,
            menuItem: item._id,
            quantity: 1
        }))
    };

    try {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(orderData)
        });

        const data = await response.json();

        if (response.ok) {
            alert("The order was successfully placed! 🍣");
            localStorage.removeItem('cart');
            window.location.href = 'index.html';
        } else {
            alert("Error: " + (data.message || "Couldn't create an order"));
        }
    } catch (err) {
        console.error("Checkout Error:", err);
        alert("Connection problem. Check the server operation.");
    }
}
renderCart();