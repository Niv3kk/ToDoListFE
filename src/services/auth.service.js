import {
    API_URL,
    apiFetch,
} from './api.service';

export async function login(credentials) {
    return apiFetch(
        `${API_URL}/login`,
        {
            method: 'POST',

            body: JSON.stringify(credentials),
        },
        false
    );
}
