const API_URL =
    import.meta.env.VITE_API_URL ||
    'http://localhost:3000';

const URL_TASK = `${API_URL}/tasks`;
const URL_TAG = `${API_URL}/tags`;
const URL_CATEGORY = `${API_URL}/categories`;
const URL_AUTH = `${API_URL}/auth`;
const URL_USER = `${API_URL}/users`;

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

const handleResponse = async (
    response,
    includeToken = true
) => {
    const data = await response
        .json()
        .catch(() => ({}));

    if (
        response.status === 401 &&
        includeToken
    ) {
        removeToken();

        localStorage.removeItem('user');

        window.dispatchEvent(
            new Event('auth:unauthorized')
        );

        throw new Error(
            data.message ||
            'Tu sesión ha expirado. Inicia sesión nuevamente.'
        );
    }

    if (!response.ok) {
        throw new Error(
            data.message ||
            `Error en la petición. Estado: ${response.status}`
        );
    }

    return data;
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

    return handleResponse(
        response,
        includeToken
    );
};

export {
    API_URL,
    URL_TASK,
    URL_TAG,
    URL_CATEGORY,
    URL_AUTH,
    URL_USER,
    HEADERS,
    getToken,
    removeToken,
    handleResponse,
    apiFetch,
};