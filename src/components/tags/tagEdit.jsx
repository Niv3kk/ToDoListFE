import { useEffect, useState } from 'react';
import { update } from '../../services/tag.service';

function TagEdit({
    tag,
    onUpdated,
    onCancel,
}) {
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (tag) {
            setName(tag.name);
        }
    }, [tag]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError(null);

        if (!name.trim()) {
            setError(
                'El nombre de la etiqueta es obligatorio.'
            );
            return;
        }

        try {
            setLoading(true);

            await update(tag.id, {
                name: name.trim(),
            });

            onUpdated();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (!tag) {
        return null;
    }

    return (
        <div className="tag-card">
            <h2>Editar etiqueta</h2>

            <form
                onSubmit={handleSubmit}
                className="tag-form"
            >
                <div className="form-group">
                    <label htmlFor="edit-tag-name">
                        Nombre
                    </label>

                    <input
                        id="edit-tag-name"
                        type="text"
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
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TagEdit;