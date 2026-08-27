const API_URL = 'http://127.0.0.1:8000/api/categories';

export async function getAll() {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));

        throw new Error(
            error.message ||
            `Error al obtener las categorías. Estado: ${response.status}`
        );
    }

    return response.json();
}