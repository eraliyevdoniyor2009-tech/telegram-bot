// Telegram Web App ni ishga tushirish
let tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();

// Ma'lumotlar
const categories = [
    { id: 'all', name: 'Barchasi' },
    { id: 'food', name: 'Oziq-ovqat' },
    { id: 'drinks', name: 'Ichimliklar' },
    { id: 'snacks', name: 'Gazaklar' },
    { id: 'household', name: 'Uy-ro\'zg\'or' }
];

const products = [
    { id: 1, name: 'Non', price: 3000, category: 'food', emoji: '🍞' },
    { id: 2, name: 'Sut', price: 8000, category: 'drinks', emoji: '🥛' },
    { id: 3, name: 'Tuxum (10 dona)', price: 15000, category: 'food', emoji: '🥚' },
    { id: 4, name: 'Chips', price: 5000, category: 'snacks', emoji: '🥔' },
    { id: 5, name: 'Sok', price: 6000, category: 'drinks', emoji: '🧃' },
    { id: 6, name: 'Shokolad', price: 12000, category: 'snacks', emoji: '🍫' },
    { id: 7, name: 'Guruch (1kg)', price: 18000, category: 'food', emoji: '🍚' },
    { id: 8, name: 'Suv (1.5L)', price: 3000, category: 'drinks', emoji: '💧' },
    { id: 9, name: 'Moy (1L)', price: 25000, category: 'food', emoji: '🛢️' },
    { id: 10, name: 'Sovun', price: 4000, category: 'household', emoji: '🧼' },
    { id: 11, name: 'Shampo', price: 15000, category: 'household', emoji: '🧴' },
    { id: 12, name: 'Qog\'oz sochiq', price: 8000, category: 'household', emoji: '🧻' }
];

let cart = {};
let currentCategory = 'all';
let selectedPaymentMethod = 'cash';

// Kategoriyalarni render qilish
function renderCategories() {
    const categoriesContainer = document.getElementById('categories');
    categoriesContainer.innerHTML = categories.map(cat => `
        <button class="category-btn ${cat.id === currentCategory ? 'active' : ''}" 
                onclick="filterByCategory('${cat.id}')">
            ${cat.name}
        </button>
    `).join('');
}

// Mahsulotlarni filter qilish
function filterByCategory(categoryId) {
    currentCategory = categoryId;
    renderCategories();
    renderProducts();
}

// Mahsulotlarni render qilish
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const filteredProducts = currentCategory === 'all' 
        ? products 
        : products.filter(p => p.category === currentCategory);
    
    productsGrid.innerHTML = filteredProducts.map(product => {
        const quantity = cart[product.id] || 0;
        return `
            <div class="product-card">
                <div class="product-image">${product.emoji}</div>
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">${formatPrice(product.price)}</div>
                    ${quantity > 0 ? `
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="decreaseQuantity(${product.id})">−</button>
                            <span class="quantity-display">${quantity}</span>
                            <button class="quantity-btn" onclick="increaseQuantity(${product.id})">+</button>
                        </div>
                    ` : `
                        <button class="add-btn" onclick="addToCart(${product.id})">Qo'shish</button>
                    `}
                </div>
            </div>
        `;
    }).join('');
}

// Narxni formatlash
function formatPrice(price) {
    return `${price.toLocaleString('uz-UZ')} so'm`;
}

// Savatchaga qo'shish
function addToCart(productId) {
    cart[productId] = 1;
    updateCart();
    renderProducts();
    
    // Haptic feedback
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('light');
    }
}

// Miqdorni oshirish
function increaseQuantity(productId) {
    cart[productId] = (cart[productId] || 0) + 1;
    updateCart();
    renderProducts();
    
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('light');
    }
}

// Miqdorni kamaytirish
function decreaseQuantity(productId) {
    if (cart[productId] > 1) {
        cart[productId]--;
    } else {
        delete cart[productId];
    }
    updateCart();
    renderProducts();
    
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('light');
    }
}

// Savatchani yangilash
function updateCart() {
    const cartButton = document.getElementById('cartButton');
    const cartCount = document.getElementById('cartCount');
    
    const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
    const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
        const product = products.find(p => p.id == id);
        return sum + (product.price * qty);
    }, 0);
    
    cartCount.textContent = totalItems;
    
    if (totalItems > 0) {
        cartButton.disabled = false;
        cartButton.innerHTML = `
            <span>Savatchaga o'tish</span>
            <span class="cart-badge">${totalItems}</span>
        `;
    } else {
        cartButton.disabled = true;
        cartButton.innerHTML = `
            <span>Savatcha bo'sh</span>
            <span class="cart-badge">0</span>
        `;
    }
}

// Savatchani ko'rsatish
function showCart() {
    document.getElementById('productsView').classList.remove('active');
    document.getElementById('productsView').style.display = 'none';
    document.getElementById('cartView').classList.add('active');
    document.getElementById('cartView').style.display = 'block';
    document.getElementById('successView').classList.remove('active');
    document.getElementById('cartButton').style.display = 'none';
    
    renderCartItems();
    
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('medium');
    }
}

// Mahsulotlarni ko'rsatish
function showProducts() {
    document.getElementById('productsView').style.display = 'block';
    document.getElementById('cartView').classList.remove('active');
    document.getElementById('cartView').style.display = 'none';
    document.getElementById('successView').classList.remove('active');
    document.getElementById('cartButton').style.display = 'flex';
    
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('medium');
    }
}

// Savatcha elementlarini render qilish
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const checkoutSection = document.getElementById('checkoutSection');
    
    const cartEntries = Object.entries(cart);
    
    if (cartEntries.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <div>Savatcha bo'sh</div>
            </div>
        `;
        checkoutSection.classList.add('hidden');
        return;
    }
    
    cartItemsContainer.innerHTML = cartEntries.map(([productId, quantity]) => {
        const product = products.find(p => p.id == productId);
        const itemTotal = product.price * quantity;
        
        return `
            <div class="cart-item">
                <div class="cart-item-image">${product.emoji}</div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${product.name}</div>
                    <div class="cart-item-price">${formatPrice(product.price)} × ${quantity} = ${formatPrice(itemTotal)}</div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="decreaseQuantity(${product.id}); renderCartItems();">−</button>
                        <span class="quantity-display">${quantity}</span>
                        <button class="quantity-btn" onclick="increaseQuantity(${product.id}); renderCartItems();">+</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    checkoutSection.classList.remove('hidden');
    updateCheckoutSummary();
}

// Checkout xulosasini yangilash
function updateCheckoutSummary() {
    const subtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
        const product = products.find(p => p.id == id);
        return sum + (product.price * qty);
    }, 0);
    
    const deliveryFee = 0; // Bepul yetkazib berish
    const total = subtotal + deliveryFee;
    
    document.getElementById('subtotal').textContent = formatPrice(subtotal);
    document.getElementById('deliveryFee').textContent = deliveryFee > 0 ? formatPrice(deliveryFee) : 'Bepul';
    document.getElementById('finalTotal').textContent = formatPrice(total);
}

// To'lov usulini tanlash
document.addEventListener('DOMContentLoaded', function() {
    const paymentMethods = document.querySelectorAll('.payment-method');
    const receiptUpload = document.getElementById('receiptUpload');
    
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('selected'));
            this.classList.add('selected');
            selectedPaymentMethod = this.dataset.method;
            
            if (selectedPaymentMethod === 'card') {
                receiptUpload.classList.remove('hidden');
            } else {
                receiptUpload.classList.add('hidden');
            }
            
            if (tg.HapticFeedback) {
                tg.HapticFeedback.impactOccurred('light');
            }
        });
    });
    
    // Chek yuklash
    const receiptInput = document.getElementById('receiptInput');
    const receiptPreview = document.getElementById('receiptPreview');
    
    receiptInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                receiptPreview.src = e.target.result;
                receiptPreview.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
            
            if (tg.HapticFeedback) {
                tg.HapticFeedback.impactOccurred('medium');
            }
        }
    });
    
    // Telefon raqami formatlash
    const phoneInput = document.getElementById('phoneInput');
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.startsWith('998')) {
            value = value.substring(3);
        }
        
        if (value.length > 0) {
            let formatted = '+998 ';
            if (value.length > 0) formatted += value.substring(0, 2);
            if (value.length > 2) formatted += ' ' + value.substring(2, 5);
            if (value.length > 5) formatted += ' ' + value.substring(5, 7);
            if (value.length > 7) formatted += ' ' + value.substring(7, 9);
            
            e.target.value = formatted;
        }
    });
    
    // Forma yuborish
    const checkoutForm = document.getElementById('checkoutForm');
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const phone = document.getElementById('phoneInput').value;
        const address = document.getElementById('addressInput').value;
        const notes = document.getElementById('notesInput').value;
        
        // Karta to'lovi uchun chek tekshirish
        if (selectedPaymentMethod === 'card') {
            const receipt = document.getElementById('receiptInput').files[0];
            if (!receipt) {
                tg.showAlert('Iltimos, to\'lov chekini yuklang');
                return;
            }
        }
        
        // Buyurtma ma'lumotlari
        const orderData = {
            items: Object.entries(cart).map(([id, qty]) => {
                const product = products.find(p => p.id == id);
                return {
                    name: product.name,
                    price: product.price,
                    quantity: qty,
                    total: product.price * qty
                };
            }),
            customer: {
                phone: phone,
                address: address,
                notes: notes
            },
            payment: {
                method: selectedPaymentMethod,
                hasReceipt: selectedPaymentMethod === 'card'
            },
            total: Object.entries(cart).reduce((sum, [id, qty]) => {
                const product = products.find(p => p.id == id);
                return sum + (product.price * qty);
            }, 0),
            timestamp: new Date().toISOString()
        };
        
        // Telegram botiga ma'lumot yuborish
        tg.sendData(JSON.stringify(orderData));
        
        // Muvaffaqiyat ko'rinishini ko'rsatish
        showSuccess();
        
        if (tg.HapticFeedback) {
            tg.HapticFeedback.notificationOccurred('success');
        }
    });
});

// Muvaffaqiyat ko'rinishini ko'rsatish
function showSuccess() {
    document.getElementById('productsView').style.display = 'none';
    document.getElementById('cartView').classList.remove('active');
    document.getElementById('cartView').style.display = 'none';
    document.getElementById('successView').classList.add('active');
    document.getElementById('cartButton').style.display = 'none';
}

// Ilovani qayta boshlash
function resetApp() {
    cart = {};
    currentCategory = 'all';
    selectedPaymentMethod = 'cash';
    
    document.getElementById('checkoutForm').reset();
    document.getElementById('receiptPreview').classList.add('hidden');
    document.getElementById('receiptUpload').classList.add('hidden');
    
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(m => m.classList.remove('selected'));
    paymentMethods[0].classList.add('selected');
    
    updateCart();
    showProducts();
    renderProducts();
    
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('medium');
    }
}

// Dastlabki render
renderCategories();
renderProducts();
updateCart();
