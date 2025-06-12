// 
// 
// 
import { post } from './api.js';

//
export function userSignUp(userData) {
    return post('/users/auth/signup', userData, false);
}

//
export function userLogin(userData) {
    return post('/users/auth/login', userData, false);
}
