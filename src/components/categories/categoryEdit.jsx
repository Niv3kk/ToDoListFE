import { useEffect, useState } from 'react';
import { update } from '../../services/category.service';

function CategoryEdit({ category, onUpdated, onCancel }) {
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (category) {
            setName(category.name);
        }
    }, [category]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError(null);

        const normalizedName = name.trim();
        const isEmptyName = normalizedName.length === 0;

        if (isEmptyName) {
            setError('El nombre de la categoría es obligatorio.');
            return;
        }

        try {
            setLoading(true);

            await update(category.id, {
                name: normalizedName,
            });

            onUpdated();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (!category) {
        return null;
    }

    return (
        <div className="category-card">
            <h2>Editar categoría</h2>

            <form
                onSubmit={handleSubmit}
                className="category-form"
            >
                <div className="form-group">
                    <label htmlFor="edit-category-name">
                        Nombre
                    </label>

                    <input
                        type="text"
                        id="edit-category-name"
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                    />
                </div>

                {error && (
                    <p className="message message-error">
                        {error}
                    </p>
                )}

                <div className="form-actions">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading
                            ? 'Actualizando...'
                            : 'Actualizar'}
                    </button>

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onCancel}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CategoryEdit;