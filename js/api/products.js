// 
// 
// 

import { get } from './api.js';

//
export function getProducts() {
    return get('/products', false);
}

//
export function showProduct(product_id) {
    return get('/products/' + product_id, false);
}
