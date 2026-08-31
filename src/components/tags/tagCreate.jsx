import { useState } from 'react';
import { create } from '../../services/tag.service';

function TagCreate({ onCreated }) {
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError(null);
        setSuccess(null);

        if (!name.trim()) {
            setError('El nombre de la etiqueta es obligatorio.');
            return;
        }

        try {
            setLoading(true);

            const response = await create({
                name: name.trim(),
            });

            setSuccess(
                response.message ||
                'Etiqueta creada correctamente.'
            );

            setName('');

            onCreated();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="tag-card">
            <h2>Crear etiqueta</h2>

            <form
                onSubmit={handleSubmit}
                className="tag-form"
            >
                <div className="form-group">
                    <label htmlFor="tag-name">
                        Nombre
                    </label>

                    <input
                        id="tag-name"
                        type="text"
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                        placeholder="Ej: Urgente"
                    />
                </div>

                {error && (
                    <p className="message message-error">
                        {error}
                    </p>
                )}

                {success && (
                    <p className="message message-success">
                        {success}
                    </p>
                )}

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading
                        ? 'Guardando...'
                        : 'Crear etiqueta'}
                </button>
            </form>
        </div>
    );
}

export default TagCreate;