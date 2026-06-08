let total = 0;
let cart = [];

function addToCart(item, price) {
    let li = document.createElement("li");
    li.textContent = item + " - ₹" + price;

    document.getElementById("cartList").appendChild(li);

    total += price;
    document.getElementById("total").textContent = total;

    cart.push({ item, price });
}

function placeOrder() {
    if (cart.length === 0) {
        alert("❌ Your cart is empty!");
        return;
    }

    fetch('http://localhost:5000/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart, total })
    })
    .then(res => res.json())
    .then(data => {
        alert("✅ Order Placed Successfully!");
        console.log(data);
        
        // ஆர்டர் முடிந்ததும் கார்ட்டை காலி செய்ய:
        cart = [];
        total = 0;
        document.getElementById("cartList").innerHTML = "";
        document.getElementById("total").textContent = "0";
    })
    .catch(err => {
        console.error("Error:", err);
        alert("❌ Server உடன் இணைக்க முடியவில்லை! (Check if backend is running)");
    });
}