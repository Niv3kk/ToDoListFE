import {
    URL_CATEGORY,
    apiFetch,
} from './api.service';


export async function getAll() {
    return apiFetch(URL_CATEGORY, {
        method: 'GET',
    });
}


export async function getOne(id) {
    return apiFetch(`${URL_CATEGORY}/${id}`, {
        method: 'GET',
    });
}


export async function create(category) {
    return apiFetch(URL_CATEGORY, {
        method: 'POST',

        body: JSON.stringify(category),
    });
}


export async function update(id, category) {
    return apiFetch(`${URL_CATEGORY}/${id}`, {
        method: 'PUT',

        body: JSON.stringify(category),
    });
}


export async function remove(id) {
    return apiFetch(`${URL_CATEGORY}/${id}`, {
        method: 'DELETE',
    });
}