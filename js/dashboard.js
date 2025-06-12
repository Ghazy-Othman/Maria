// 
// 
// 

import { addProduct, updateProduct, deleteProduct, addCategory, deleteCategory } from './api/admin.js';
import { getProducts } from './api/products.js';

//
let categories = [];
let products = [];
let current_category = -1;


const categorySelector = document.getElementById('product_cateogry');

addEventListener('change', () => {
    current_category = categorySelector.value;
    console.log(current_category);
});

// Add new product
document.getElementById('addProductForm').addEventListener('submit', async (e) => {

    console.log(current_category);

    e.preventDefault();

    const product_name = document.getElementById('product_name').value;
    const cost = document.getElementById('product_cost').value;
    const description = document.getElementById('product_description').value;
    const discount = document.getElementById('product_discount').value;
    const product_image_file = document.getElementById('product_image');

    if (current_category == -1) {
        alert("Choose category");
        return;
    }

    const formData = new FormData();
    formData.append('product_name', product_name);
    formData.append('cost', cost);
    formData.append('description', description);
    formData.append('discount', discount);
    formData.append('category_id', current_category); /// TODO 
    if (product_image_file.files.length != 0) {
        const product_image = product_image_file.files[0];
        formData.append('product_image', product_image); // only append if selected"
    }


    console.log(formData);

    try {
        const result = await addProduct(formData);

        if (result?.data) {
            alert("Product added successfully");
            location.reload();
            console.log(result);
        }
        else {
            throw result;
        }
    }
    catch (err) {
        alert(err);
        console.error("Failed to add new product..", err);
    }
});


// Add new category
document.getElementById('addCategoryForm').addEventListener('submit', async (e) => {

    e.preventDefault();

    const category = {
        category_name: document.getElementById("category_name").value
    };

    try {
        const result = await addCategory(category);

        if (result?.data) {
            alert("Category added successfully");
            location.reload();
        }
        else {
            throw result;
        }

    }
    catch (err) {
        alert(err);
        console.error(err);
    }
});


//
function addCategoryToDropdown(categoryId, categoryName) {
    const select = document.getElementById('product_cateogry');

    const option = document.createElement('option');
    option.value = categoryId;
    option.textContent = categoryName;

    select.appendChild(option);
}
//
function addProductToProductsList(id, name, cost, description, discount) {
    document.getElementById('productsList').insertAdjacentHTML('beforeend', `<div id="product_${id}" class="product-card">
                  <h4>${name}</h4>
                  <p>${description}</p>
                  <p>Cost: ${cost} S.P | Discount: ${discount}%</p>
                  <div class="card-actions">
                    <button type="button" onclick="deleteProduct(${id})">Delete</button>
                  </div>
                </div>`);
}

// 
function addCategoriesToCategoriesList(id, name) {
    document.getElementById('categoriesList').insertAdjacentHTML('beforeend', `<div id="category_${id}" class="category-card">
                    <h4>${name}</h4>
                    <div class="card-actions">
                        <button type="button" onclick="deleteCategory(${id})">Delete</button>
                    </div>
                </div>`);
}

//
async function getProductsWithCategories() {

    try {
        const result = await getProducts();

        console.log(result);

        if (result?.data) {
            products = result.data.products.products;
            categories = result.data.categories;
            categories.forEach(element => {
                addCategoryToDropdown(element.category_id, element.category_name);
                addCategoriesToCategoriesList(element.category_id, element.category_name);
            });

            products.forEach(element => {
                addProductToProductsList(element.product_id, element.product_name, element.cost, element.description, element.discount);
            });
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
getProductsWithCategories();

//
window.deleteProduct = async function (product_id) {

    try {
        const result = await deleteProduct(product_id);
        location.reload();
    }
    catch (err) {
        alert(err);
    }

}

//
window.deleteCategory = async function (category_id) {
    try {
        const result = await deleteCategory(category_id);
        location.reload();
    }
    catch (err) {
        alert(err);
    }
}