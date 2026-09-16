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
    const response = await getAll();

    const tasks = response.data ?? [];

    const task = tasks.find(
        (task) => task.id === id
    );

    if (!task) {
        throw new Error(
            'La tarea no fue encontrada.'
        );
    }

    return {
        data: task,
    };
}

export async function create(task) {
    return apiFetch(URL_TASK, {
        method: 'POST',

        body: JSON.stringify({
            title: task.title,
            description:
                task.description ?? null,
            is_completed:
                task.is_completed ?? false,
            category_id:
                task.category_id,
            tags:
                task.tags ?? [],
        }),
    });
}

export async function update(
    id,
    task
) {
    return apiFetch(
        `${URL_TASK}/${id}`,
        {
            method: 'PUT',

            body: JSON.stringify({
                title: task.title,
                description:
                    task.description ?? null,
                is_completed:
                    task.is_completed,
                category_id:
                    task.category_id,
                tags:
                    task.tags ?? [],
            }),
        }
    );
}

export async function remove(id) {
    return apiFetch(
        `${URL_TASK}/${id}`,
        {
            method: 'DELETE',
        }
    );
}