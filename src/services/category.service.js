import { URL_CATEGORY, HEADERS } from "./api.service"

export async function getAll() {
    const response = await fetch(URL_CATEGORY, {
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


export async function create(category) {
    const response = await fetch(URL_CATEGORY, {
        method: 'POST',
        headers: {
            ...HEADERS,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(category),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(
            data?.message ||
            `Ocurrió un error al crear la categoría. Estado: ${response.status}`
        );
    }

    return data;
}
