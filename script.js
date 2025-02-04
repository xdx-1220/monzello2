document.addEventListener("DOMContentLoaded", () => {
    let cart = [];

    function addToCart(item) {
        cart.push(item);
        updateCartUI();
    }

    function updateCartUI() {
        const cartElement = document.querySelector(".cart-items");
        if (!cartElement) return;
        cartElement.innerHTML = "";
        cart.forEach((item) => {
            const itemElement = document.createElement("div");
            itemElement.textContent = `${item.name} - ${item.price} €`;
            cartElement.appendChild(itemElement);
        });
    }

    const stripe = Stripe('your-publishable-key');

    const checkoutButton = document.querySelector(".checkout-button");
    if (checkoutButton) {
        checkoutButton.addEventListener("click", () => {
            stripe.redirectToCheckout({
                lineItems: cart.map(item => ({ price: item.stripePriceId, quantity: 1 })),
                mode: 'payment',
                successUrl: 'success.html',
                cancelUrl: 'cancel.html'
            });
        });
    }
});
