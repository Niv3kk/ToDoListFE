import {
    URL_TASK,
    HEADERS,
    handleResponse,
} from './api.service';

export async function getAll() {
    const response = await fetch(URL_TASK, {
        method: 'GET',
        headers: HEADERS,
    });

    return handleResponse(response);
}

export async function create(task) {
    const response = await fetch(URL_TASK, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(task),
    });

    return handleResponse(response);
}

export async function update(id, task) {
    const response = await fetch(`${URL_TASK}/${id}`, {
        method: 'PUT',
        headers: HEADERS,
        body: JSON.stringify(task),
    });

    return handleResponse(response);
}

export async function getOne(id) {
    const response = await fetch(`${URL_TASK}/${id}`, {
        method: 'GET',
        headers: HEADERS,
    });

    return handleResponse(response);
}

export async function remove(id) {
    const response = await fetch(`${URL_TASK}/${id}`, {
        method: 'DELETE',
        headers: HEADERS,
    });

    return handleResponse(response);
}