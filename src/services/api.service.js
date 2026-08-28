const API_URL = 'http://127.0.0.1:8000/api';
const URL_TAG = `${API_URL}/tags`;
const URL_CATEGORY = `${API_URL}/categories`;

const HEADERS = {
    'Accept': 'application/json',
};

const handleResponse = async (response) => {
    try{
        if(!response.ok){
            const errorData = await response.json().catch(() => ({
                message: 'No se logro parsear la respuesta de Error'
            }));
            throw new Error(`Error en la peticion: ${response.statusText}`);
        }
        return await response.json();
    }catch(e){
        throw e;
    }
};

export { API_URL, HEADERS, handleResponse, URL_TAG, URL_CATEGORY };