import { useState } from 'react';
import { create } from '../../services/category.service';
import "../../styles/categoryCreate.css"

function CategoryCreate({ onCreated }) {
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError(null);
        setSuccess(null);

        if (!name.trim()) {
            setError('El nombre de la categoría es obligatorio.');
            return;
        }

        try {
            setLoading(true);

            const response = await create({
                name: name.trim(),
            });

            setSuccess(response.message || 'Categoría creada correctamente.');
            setName('');

            if (onCreated) {
                onCreated();
            }
        } catch (error) {

            throw new Error('Ocurrió un error al crear la categoría.');

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="categoryCreate">
            <h2>Crear categoría</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nombre</label>

                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>

                {error && <p>{error}</p>}
                {success && <p>{success}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? 'Guardando...' : 'Crear categoría'}
                </button>
            </form>
        </div>
    );
}

export default CategoryCreate;