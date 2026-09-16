import {
    URL_AUTH,
    URL_USER,
    apiFetch,
    removeToken,
} from './api.service';

export async function login({
    email,
    password,
}) {
    return apiFetch(
        `${URL_AUTH}/login`,
        {
            method: 'POST',

            body: JSON.stringify({
                email,
                password,
            }),
        },
        false
    );
}

export async function register({
    name,
    email,
    password,
}) {
    return apiFetch(
        URL_USER,
        {
            method: 'POST',

            body: JSON.stringify({
                name,
                email,
                password,
            }),
        },
        false
    );
}

export function logout() {
    removeToken();

    localStorage.removeItem('user');
}

export function getCurrentUser() {
    const user =
        localStorage.getItem('user');

    return user
        ? JSON.parse(user)
        : null;
}

export function isAuthenticated() {
    return Boolean(
        localStorage.getItem('token')
    );
}