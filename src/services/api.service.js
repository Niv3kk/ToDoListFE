const API_URL = 'http://127.0.0.1:8000/api';

const URL_TASK = `${API_URL}/tasks`;
const URL_TAG = `${API_URL}/tags`;
const URL_CATEGORY = `${API_URL}/categories`;


const HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

const getToken = () => {
    return localStorage.getItem('token');
};


const removeToken = () => {
    localStorage.removeItem('token');
};

const handleResponse = async (response) => {

    if (response.status === 401) {

        removeToken();

        window.dispatchEvent(
            new Event('auth:unauthorized')
        );

        throw new Error(
            'Tu sesión ha expirado. Inicia sesión nuevamente.'
        );
    }


    if (!response.ok) {

        const errorData = await response
            .json()
            .catch(() => ({
                message:
                    'No se pudo procesar la respuesta de error.',
            }));

        throw new Error(
            errorData.message ||
            `Error en la petición. Estado: ${response.status}`
        );
    }


    return response.json();
};

const getHeaders = (
    customHeaders = {},
    includeToken = true
) => {

    const headers = {
        ...HEADERS,
        ...customHeaders,
    };


    if (includeToken) {

        const token = getToken();

        if (token) {
            headers.Authorization =
                `Bearer ${token}`;
        }

    }


    return headers;
};

const apiFetch = async (
    url,
    options = {},
    includeToken = true
) => {

    const response = await fetch(url, {

        ...options,

        headers: getHeaders(
            options.headers,
            includeToken
        ),

    });


    return handleResponse(response);
};


export {
    API_URL,
    URL_TASK,
    URL_TAG,
    URL_CATEGORY,
    HEADERS,
    getToken,
    removeToken,
    handleResponse,
    apiFetch,
};