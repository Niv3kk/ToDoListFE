import {
    URL_TAG,
    apiFetch,
} from './api.service';


export async function getAll() {
    return apiFetch(URL_TAG, {
        method: 'GET',
    });
}

export async function getOne(id) {
    const response = await getAll();

    const tags =
        response.data ?? [];

    const tag = tags.find(
        (tag) => tag.id === id
    );

    if (!tag) {
        throw new Error(
            'La etiqueta no fue encontrada.'
        );
    }

    return {
        data: tag,
    };
}

export async function create(tag) {
    return apiFetch(URL_TAG, {
        method: 'POST',

        body: JSON.stringify({
            name: tag.name,
        }),
    });
}

export async function update(
    id,
    tag
) {
    return apiFetch(
        `${URL_TAG}/${id}`,
        {
            method: 'PUT',

            body: JSON.stringify({
                name: tag.name,
            }),
        }
    );
}

export async function remove(id) {
    return apiFetch(
        `${URL_TAG}/${id}`,
        {
            method: 'DELETE',
        }
    );
}