//
//
//

import { showUserCart, removeProductFromCart, incQuantity, deQuantity, makeOrder } from "./api/cart.js";

//
let user_name = "none";

//
window.inc_qua = async function (product_id, quantity) {
    const data = {
        'product_id': product_id,
        'quantity': quantity + 1,
    };

    try {
        const res = await incQuantity(data);
        if (res?.data?.msg) {
            alert(res.data.msg);
            location.reload();
        }
        else {
            throw res;
        }
    }
    catch (err) {
        console.error(err);
    }
}
window.de_qua = async function (product_id, quantity) {

    const data = {
        'product_id': product_id,
        'quantity': quantity - 1,
    };

    try {
        const res = await deQuantity(data);
        if (res?.data?.msg) {
            alert(res.data.msg);
            location.reload();
        }
        else {
            throw res;
        }
    }
    catch (err) {
        console.error(err);
    }
}
window.remove_product = async function (product_id) {

    const data = {
        'product_id': product_id,
        'quantity': 0,
    };

    try {
        const res = await removeProductFromCart(data);
        if (res?.data?.msg) {
            alert(res.data.msg);
            location.reload();
        }
        else {
            throw res;
        }
    }
    catch (err) {
        console.error(err);
    }
}



//
let cart_items = [];
async function showCart() {
    try {
        const result = await showUserCart();
        if (result?.data?.cart?.cart_id) {
            localStorage.setItem("user_name", result.data.user_name);
            cart_items = result.data.cart.items;
            const items_list = document.getElementById('items_list');
            //
            console.log(cart_items);
            //
            cart_items.forEach(element => {
                items_list.insertAdjacentHTML('beforeend', `<tr>
                    <td><img id="imgPur" src="${element.product.product_image}" alt=" "></td>
                    <td> ${element.product.product_name}</td>
                    <td>
                        <p>${element.product.description}</p>
                    </td>
                    <td>${element.product.cost} S.P</td>
                    <td>${element.product.discount} %</td>
                    <td>${element.quantity}</td>
                    <td>${element.price} S.P</td>
                    <td><button onclick="inc_qua(${element.product.product_id} , ${element.quantity})">+</button><br>
                    <button onclick="de_qua(${element.product.product_id} , ${element.quantity})">-</button><br>
                    <button onclick="remove_product(${element.product.product_id} , ${element.quantity})">Remove</button></td>
                </tr>`);
            });

        }
        else {
            throw result;
        }
        console.log(cart_items);
    }
    catch (err) {
        // alert(err);
        console.error(err);
    }
}

await showCart();


//
async function showCompletePurchaseForm() {
    console.log(cart_items);
    if (cart_items.length != 0) {
        document.getElementById('shopping-basket').style.display = 'block';
    }
    document.getElementById('customer-name').value = localStorage.getItem("user_name");
}

showCompletePurchaseForm();


//
document.getElementById('shopping-basket').addEventListener('submit', async (e) => {

    e.preventDefault();


    try {
        const result = await makeOrder();
        if (result?.data?.msg) {
            alert("Purchase completed successfully..");
            location.reload();
        }
        else {
            throw result;
        }
    }
    catch (err) {
        console.error(err);
    }
});