import {
    URL_TAG,
    apiFetch,
} from './api.service';


export async function getAll() {
    return apiFetch(URL_TAG, {
        method: 'GET',
    });
}


export async function getOne(id) {
    return apiFetch(`${URL_TAG}/${id}`, {
        method: 'GET',
    });
}


export async function create(tag) {
    return apiFetch(URL_TAG, {
        method: 'POST',

        body: JSON.stringify(tag),
    });
}


export async function update(id, tag) {
    return apiFetch(`${URL_TAG}/${id}`, {
        method: 'PUT',

        body: JSON.stringify(tag),
    });
}


export async function remove(id) {
    return apiFetch(`${URL_TAG}/${id}`, {
        method: 'DELETE',
    });
}