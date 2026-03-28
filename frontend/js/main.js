let allItems = [];

async function fetchMenu() {
    try {
        const response = await fetch(`${API_URL}/menu`);
        allItems = await response.json();
        renderMenu(allItems);
    } catch (error) {
        console.error("Error loading menu:", error);
        document.getElementById('menu-grid').innerHTML = "<p>Failed to load menu. Is the server running?</p>";
    }
}

function renderMenu(items) {
    const grid = document.getElementById('menu-grid');
    grid.innerHTML = items.map(item => `
        <div class="bg-stone-800/40 border border-stone-800 rounded-2xl overflow-hidden hover:border-red-600/50 transition-all duration-500 group">
            <div class="h-64 overflow-hidden">
                <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700">
            </div>
            <div class="p-6">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <span class="text-xs text-red-500 uppercase tracking-widest font-semibold">${item.category}</span>
                        <h3 class="text-xl font-bold mt-1">${item.name}</h3>
                    </div>
                    <span class="text-xl font-serif text-red-500 font-bold">$${item.price}</span>
                </div>
                <p class="text-stone-400 text-sm mb-6 leading-relaxed">${item.description}</p>
                <button onclick="addToCart('${item._id}')" class="w-full py-3 bg-stone-700 hover:bg-red-600 text-white rounded-lg font-bold transition duration-300 uppercase text-xs tracking-widest">
                    Add to order
                </button>
            </div>
        </div>
    `).join('');
}

function filterItems(category, buttonElement) {
    // 1. Визуальная часть: переключаем кнопки
    const buttons = document.querySelectorAll('.cat-btn');

    buttons.forEach(btn => {
        // Сбрасываем все кнопки до стандартного (темного) вида
        btn.classList.remove('bg-red-600', 'text-white', 'border-red-600');
        btn.classList.add('border-stone-700', 'text-stone-100');
    });

    buttonElement.classList.add('bg-red-600', 'text-white', 'border-red-600');
    buttonElement.classList.remove('border-stone-700');

    if (category === 'All') {
        renderMenu(allItems);
    } else {
        const filtered = allItems.filter(item => item.category === category);
        renderMenu(filtered);
    }
}
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user'));
    const authSection = document.getElementById('auth-link');

    if (user && authSection) {
        authSection.innerText = user.username.toUpperCase();
        authSection.href = 'profile.html';
        authSection.classList.add('text-red-600', 'font-bold');

        if (user.role === 'admin') {
            const nav = document.getElementById('nav-links');
            const adminLink = document.createElement('a');
            adminLink.href = 'admin.html';
            adminLink.innerText = 'Admin Panel';
            adminLink.className = 'text-yellow-500 hover:text-yellow-400 transition';
            nav.prepend(adminLink);
        }
    }
}

checkAuth();

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
    const user = localStorage.getItem('token');

    if (!user) {
        alert("Please login to start ordering! 🍣");
        window.location.href = 'login.html';
        return;
    }

    const item = allItems.find(p => p._id === productId);

    if (item) {
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));

        alert(`${item.name} added to your order!`);
        updateCartCounter();
    }
}

function updateCartCounter() {
    const cartBtn = document.getElementById('cart-count');
    if (cartBtn) {
        cartBtn.innerText = cart.length;
    }
}

updateCartCounter();

fetchMenu();