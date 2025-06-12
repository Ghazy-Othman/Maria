// 
// 
// 

import { userLogin, userSignUp } from './api/user.js';


// Sign up
document.getElementById('signUpForm').addEventListener('submit', async (e) => {

    e.preventDefault();

    // Get form values
    const name = document.getElementById('user_name').value;
    const email = document.getElementById('user_email_signup').value;
    const password = document.getElementById('password_signup').value;
    const profileImageInput = document.getElementById('profile_image');
    const profileImage = profileImageInput.files[0]; // Get the actual file

    // Prepare FormData for sending file + text fields
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', 'user');
    if (profileImage) {
        formData.append('profile_image', profileImage); // only append if selected
    }

    try {
        const result = await userSignUp(formData);
        if (result?.data?.token) {
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('role', 'user');
            localStorage.setItem('user_id', result.data.user.user_id);
        }
        else {
            throw result.error_message;
        }

        // 
        console.log("User Sign up : ", result);

        // Redirect to home page if success
        window.location.href = 'index.html';
    }
    catch (err) {
        alert(err);
        console.error("Failed to Sign up....", err);
    }

});

// Login
document.getElementById('loginForm').addEventListener('submit', async (e) => {

    e.preventDefault();

    const user = {
        email: document.getElementById('user_email_login').value,
        password: document.getElementById('password_login').value,
    };

    // console.log("user" , user) ; 
    try {
        const result = await userLogin(user);

        if (result?.data?.token) {
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('role', result.data.user.role);
            localStorage.setItem('user_id', result.data.user.user_id);
        }
        else {
            throw result.error_message;
        }

        // 
        console.log("User Login ", result);

        // Redirect to home page if success
        window.location.href = 'index.html';
    }
    catch (err) {
        alert(err);
        console.error("Failed to Login....", err);
    }

});