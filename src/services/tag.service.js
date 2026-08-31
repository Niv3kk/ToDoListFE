import {
    URL_TAG,
    HEADERS,
    handleResponse,
} from './api.service';


export async function getAll() {
    const response = await fetch(URL_TAG, {
        method: 'GET',
        headers: HEADERS,
    });

    return handleResponse(response);
}


export async function getOne(id) {
    const response = await fetch(`${URL_TAG}/${id}`, {
        method: 'GET',
        headers: HEADERS,
    });

    return handleResponse(response);
}


export async function create(tag) {
    const response = await fetch(URL_TAG, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(tag),
    });

    return handleResponse(response);
}


export async function update(id, tag) {
    const response = await fetch(`${URL_TAG}/${id}`, {
        method: 'PUT',
        headers: HEADERS,
        body: JSON.stringify(tag),
    });

    return handleResponse(response);
}


export async function remove(id) {
    const response = await fetch(`${URL_TAG}/${id}`, {
        method: 'DELETE',
        headers: HEADERS,
    });

    return handleResponse(response);
}