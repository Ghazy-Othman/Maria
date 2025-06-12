// 
// 
// 

import { post, get } from "./api.js";

//
export function addProductToUserCart(data) {
    const user_id = localStorage.getItem('user_id');
    return post('/users/' + user_id + '/cart/add', data, true);
}

//
export function showUserCart() {
    const user_id = localStorage.getItem('user_id');
    return get('/users/' + user_id + '/cart', {}, true);
}

//
export function removeProductFromCart(data) {
    const user_id = localStorage.getItem('user_id');
    return post('/users/' + user_id + '/cart/remove', data, true);
}

//
export function incQuantity(data) {
    const user_id = localStorage.getItem('user_id');
    return post('/users/' + user_id + '/cart/add', data, true);
}

//
export function deQuantity(data) {
    const user_id = localStorage.getItem('user_id');
    return post('/users/' + user_id + '/cart/add', data, true);
}

//
export function makeOrder() {
    const user_id = localStorage.getItem('user_id');
    return post('/users/' + user_id + '/orders/', {}, true);
}