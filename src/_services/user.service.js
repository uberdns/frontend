import config from 'config';
import { authHeader } from '../_helpers';


export const userService = {
    login,
    logout,
    getAll,
    getProfile
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        //mode: 'no-cors'
    };

    return fetch(`http://127.0.0.1:8081/login`, requestOptions)
        .then(handleResponse)
        .then(user => {         
            // login successful if there's a jwt token in the response
            if (user.access) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                window.$cookies.set('token', user.access);
                //localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}


function logout() {
    // remove user from local storage to log user out
    window.$cookies.remove('token');
}

function getProfile() {
   const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + window.$cookies.get('token')
        },
    };
    
    alert("sup")

    return fetch('http://127.0.0.1:8081/user/profile', requestOptions)
        .then(handleResponse)
        .then(profile => {
            console.log(profile)
            if (data.id) {
                return data
            }
        });
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            alert("rejection")
            return Promise.reject(error);
        }

        return data;
    });
}