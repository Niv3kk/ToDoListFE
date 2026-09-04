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