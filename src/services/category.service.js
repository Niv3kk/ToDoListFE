import {API_URL, HEADERS, handleResponse} from "./api.service"

export async function getAll() {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: HEADERS
    });

    const data = await handleResponse(response);

    return data.tags?.data || data;

}