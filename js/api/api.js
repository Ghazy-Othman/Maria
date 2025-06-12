// 
// 
// 
const BASE_URL = 'https://maria-api-production.up.railway.app/api';


// Get Token
function getAuthToken(auth) {
    if (auth == false) return {};
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
}

// Post
export async function post(endpoint, data, auth) {

    const isFormData = data instanceof FormData;

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            ...(isFormData ? { 'Accept': 'application/json', } :
                {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }),
            ...getAuthToken(auth)
        },
        body: isFormData ? data : JSON.stringify(data),

    });
    return response.json();
}

// Get
export async function get(endpoint, auth) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...getAuthToken(auth)
        }

    });
    return response.json();
}

// Put
export async function put(endpoint, data, auth) {

    const isFormData = data instanceof FormData;

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
            ...(isFormData ? { 'Accept': 'application/json', } :
                {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }),
            ...getAuthToken(auth)
        },
        body: isFormData ? data : JSON.stringify(data),

    });
    return response.json();
}


// Delete
export async function destroy(endpoint, data, auth) {

    const isFormData = data instanceof FormData;

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
            ...(isFormData ? { 'Accept': 'application/json', } :
                {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }),
            ...getAuthToken(auth)
        },
        body: isFormData ? data : JSON.stringify(data),

    });
    return response;
}