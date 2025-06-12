// Function to add items to the shopping cart
function addToCart(productName, price, quantityId) {
    const quantity = document.getElementById(quantityId).value;
    const basketBody = document.getElementById('basket-body');
    const totalAmount = document.getElementById('total-amount');

    // Create a new row for the cart item
    const newRow = document.createElement('tr');
    const itemTotal = price * quantity;

    newRow.innerHTML = `
        <td>${productName}</td>
        <td>${price} ليرة سورية</td>
        <td>${quantity}</td>
        <td>${itemTotal} ليرة سورية</td>
        <td><button onclick="removeFromCart(this, ${itemTotal})">إزالة</button></td>
    `;

    // Add the new row to the basket
    basketBody.appendChild(newRow);

    // Update the total amount
    updateTotalAmount(itemTotal);
}

// Function to remove items from the shopping cart
function removeFromCart(button, itemTotal) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);

    // Deduct the item total from the total amount
    updateTotalAmount(-itemTotal);
}

// Function to update the total amount in the cart
function updateTotalAmount(amountChange) {
    const totalAmountElement = document.getElementById('total-amount');
    const currentTotal = parseInt(totalAmountElement.textContent);
    const newTotal = currentTotal + amountChange;
    totalAmountElement.textContent = newTotal;
}

// Function to validate the national ID format
function validateNationalID() {
    const nationalId = document.getElementById('national-id').value;
    const nationalIdPattern = /^(0[1-9]|1[0-3])\d{9}$/;

    if (!nationalIdPattern.test(nationalId)) {
        alert('الرقم الوطني غير صالح. يجب أن يبدأ بالكود الصحيح ويكون من 11 رقماً.');
        return false; // Prevent form submission
    }
    return true; // Allow form submission
}
