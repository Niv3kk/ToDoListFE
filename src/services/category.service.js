import {
    URL_CATEGORY,
    HEADERS,
    handleResponse,
} from './api.service';

export async function getAll() {
    const response = await fetch(URL_CATEGORY, {
        method: 'GET',
        headers: HEADERS,
    });

    return handleResponse(response);
}

export async function create(category) {
    const response = await fetch(URL_CATEGORY, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(category),
    });

    return handleResponse(response);
}

export async function update(id, category) {
    const response = await fetch(`${URL_CATEGORY}/${id}`, {
        method: 'PUT',
        headers: HEADERS,
        body: JSON.stringify(category),
    });

    return handleResponse(response);
}

export async function remove(id) {
    const response = await fetch(`${URL_CATEGORY}/${id}`, {
        method: 'DELETE',
        headers: HEADERS,
    });

    return handleResponse(response);
}