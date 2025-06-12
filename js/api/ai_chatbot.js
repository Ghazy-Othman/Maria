//
//
//
import { post } from './api.js';

//
export function sendMsg(data) {
    const user_id = localStorage.getItem('user_id');
    return post('/users/' + user_id + '/chatbot', data, true);
}