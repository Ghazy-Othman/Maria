// 
// 
// 

import { getProducts } from './api/products.js';
import { addProductToUserCart } from './api/cart.js';


// Display dashboard button just for admin
function checkIfAdmin() {

    if (localStorage.getItem('role') != null && localStorage.getItem('role') == 'admin') {
        document.getElementById('adminBtn').style.display = 'block';
    }
}

checkIfAdmin();

document.getElementById('adminBtn').addEventListener('click', () => {
    window.location.href = './dashboard.html';
});
//
let products = [];
function addProductsToPage() {

    const products_list = document.getElementById('products_list');

    var i = 0;
    products.forEach(element => {
        if (i % 4 == 0) {
            if (i != 0) products_list.insertAdjacentHTML('beforeend', "<hr>")
            products_list.insertAdjacentHTML('beforeend', `<div class="fl"></div>`);
        }
        products_list.lastChild.insertAdjacentHTML('beforeend', `
            <div class="box">
        <img src="${element.product_image}" alt="">
        <p><b>${element.product_name}</b><br>${element.description}</p>  

        <br>
        <div class="discrption">
        <span class="pricing">
            <span>
              ${element.discount}% <small>/ Dis</small>
            </span>
          </span>
          <span id="mari"> The old price: ${element.cost}
            <hr>The price after discount: ${element.new_cost}
          </span>
          <hr>
          <center><button  type="button" onclick="addToCart(${element.product_id})">Add to cart</button></center>
        </div>
      </div>`);
        i++;
    });


}
async function getAllProducts() {


    console.log("======================");

    try {
        const result = await getProducts();

        console.log(result);

        if (result?.data) {
            products = result.data.products.products;
            // Add products to page
            addProductsToPage();
        }
        else {
            throw result;
        }
    }
    catch (err) {
        alert(err);
        console.error(err);
    }

}


//
window.addToCart = async function (product_id, quantity = 1) {

    const user_id = localStorage.getItem('user_id');
    if (!user_id) {
        alert('Please login first');
        return;
    }

    try {
        const data = {
            'product_id': product_id,
            'quantity': quantity
        };
        const result = await addProductToUserCart(data);
        if (result?.data?.msg) {
            alert(result.data.msg);

        }
        else {
            alert("something went wrong");
            throw result;
        }
    }
    catch (err) {
        console.error(err);
    }

}

getAllProducts();

