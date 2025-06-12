// 
// 
// 

import { destroy, post, put } from './api.js';

//
export function addProduct(data) {
    return post('/products', data, true);
}

//
export function updateProduct(data, product_id) {
    return put('/products/' + product_id, data, true);
}

//
export function deleteProduct(product_id) {
    return destroy('/products/' + product_id, {}, true);
}

//
export function addCategory(data) {
    return post('/categories', data, true);
}

//
export function deleteCategory(category_id) {
    return destroy('/categories/' + category_id, {}, true); 
}
