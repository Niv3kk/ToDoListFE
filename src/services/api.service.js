const API_URL = 'http://127.0.0.1:8000/api';

const URL_TASK = `${API_URL}/tasks`;
const URL_TAG = `${API_URL}/tags`;
const URL_CATEGORY = `${API_URL}/categories`;

const HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({
            message: 'No se pudo procesar la respuesta de error.',
        }));

        throw new Error(
            errorData.message ||
            `Error en la petición. Estado: ${response.status}`
        );
    }

    return response.json();
};

export {
    API_URL,
    URL_TASK,
    URL_TAG,
    URL_CATEGORY,
    HEADERS,
    handleResponse,
};