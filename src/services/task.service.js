import {
    URL_TASK,
    apiFetch,
} from './api.service';


export async function getAll() {
    return apiFetch(URL_TASK, {
        method: 'GET',
    });
}


export async function getOne(id) {
    return apiFetch(`${URL_TASK}/${id}`, {
        method: 'GET',
    });
}


export async function create(task) {
    return apiFetch(URL_TASK, {
        method: 'POST',

        body: JSON.stringify(task),
    });
}


export async function update(id, task) {
    return apiFetch(`${URL_TASK}/${id}`, {
        method: 'PUT',

        body: JSON.stringify(task),
    });
}


export async function remove(id) {
    return apiFetch(`${URL_TASK}/${id}`, {
        method: 'DELETE',
    });
}