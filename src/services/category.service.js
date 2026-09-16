import {
    URL_CATEGORY,
    apiFetch,
} from './api.service';

export async function getAll() {
    return apiFetch(URL_CATEGORY, {
        method: 'GET',
    });
}

export async function getOne(id) {
    const response = await getAll();

    const categories =
        response.data ?? [];

    const category =
        categories.find(
            (category) =>
                category.id === id
        );

    if (!category) {
        throw new Error(
            'La categoría no fue encontrada.'
        );
    }

    return {
        data: category,
    };
}


export async function create(category) {
    return apiFetch(URL_CATEGORY, {
        method: 'POST',

        body: JSON.stringify({
            name: category.name,
        }),
    });
}

export async function update(
    id,
    category
) {
    return apiFetch(
        `${URL_CATEGORY}/${id}`,
        {
            method: 'PUT',

            body: JSON.stringify({
                name: category.name,
            }),
        }
    );
}

export async function remove(id) {
    return apiFetch(
        `${URL_CATEGORY}/${id}`,
        {
            method: 'DELETE',
        }
    );
}