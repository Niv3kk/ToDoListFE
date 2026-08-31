import {
    API_URL,
    HEADERS,
    handleResponse,
} from './api.service';

export async function login(credentials) {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(credentials),
    });

    return handleResponse(response);
}