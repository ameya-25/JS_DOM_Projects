document.addEventListener('DOMContentLoaded', () => {
    //products we will display 
    const products = [
        {id: 1, name: "Product 1", price: 79.99},
        {id: 2, name: "Product 2", price: 49.99},
        {id: 3, name: "Product 3", price: 20.99}
    ];

    let cart = [];

    //grab all with ids
    const productsList = document.getElementById('product-list');
    const cartItems = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart');
    const cartTotalMessage = document.getElementById('cart-total');
    const totalPriceValue = document.getElementById('total-price');
    const checkOutBtn = document.getElementById('checkout-btn');
    
    // s1 : display products
    products.forEach((item) => {
        const product = document.createElement('div');
        product.classList.add('product');
        product.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)}</span>
            <button data-id='${item.id}'>Add to Cart</button>
        `;
        productsList.append(product);
    })

    //s2 : eventlistener on button
    productsList.addEventListener('click', (e) => {
        console.log(e.target.tagName);
        
        if (e.target.tagName === "BUTTON") {
            //now find kis button pe click hua
            const productId = Number(e.target.getAttribute("data-id"));
            const product = products.find(p => p.id === productId);

            cart.push(product);
            renderCart();
        }
    });

    
    function renderCart() {
        cartItems.innerHTML = '';
        let totalPrice = 0;
        
        if (cart.length > 0) {
            cartItems.classList.remove('hidden');
            cartTotalMessage.classList.remove('hidden');
            emptyCartMessage.classList.add('hidden');
            
            cart.forEach((item) => {
                totalPrice += item.price;
                
                const cartProd = document.createElement('div');
                cartProd.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)} <button data-id=${item.id}>remove</button>
                `;
                
                cartItems.append(cartProd);
            });
            
            totalPriceValue.textContent = `$${totalPrice.toFixed(2)}`;
        } else {
            cartItems.classList.add('hidden');
            cartTotalMessage.classList.add('hidden');
            emptyCartMessage.classList.remove('hidden');
            totalPriceValue.textContent = '$0.00';
        }
    }
    
    // handle checkout
    checkOutBtn.addEventListener('click', () => {
        cart.length = 0;
        alert('Checked out successfully!');
        renderCart();
    })


    // Add the remove button in cart
    cartItems.addEventListener('click', (e) => {
        console.log(e.target.tagName);
        if (e.target.tagName === "BUTTON"){
            const productId = Number(e.target.getAttribute("data-id"));
            
            const index = cart.findIndex(item => item.id === productId);

            if (index !== -1) {
                cart.splice(index, 1);
            }

            renderCart();
        }
        
    })

});

