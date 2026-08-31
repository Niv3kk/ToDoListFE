import { useEffect, useState } from 'react';
import { getAll } from '../../services/tag.service';

function TagList({
    refreshKey,
    onShow,
    onEdit,
    onDelete,
}) {
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTags = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await getAll();

                setTags(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadTags();
    }, [refreshKey]);

    if (loading) {
        return <p>Cargando etiquetas...</p>;
    }

    if (error) {
        return (
            <p className="message message-error">
                {error}
            </p>
        );
    }

    return (
        <section className="tag-list-section">
            <div className="section-heading">
                <div>
                    <h2>Etiquetas</h2>
                </div>

                <span className="tag-count">
                    {tags.length} etiquetas
                </span>
            </div>

            <div className="table-wrapper">
                <table className="tag-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Tareas</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tags.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="empty-table"
                                >
                                    No existen etiquetas registradas.
                                </td>
                            </tr>
                        ) : (
                            tags.map((tag) => (
                                <tr key={tag.id}>
                                    <td>{tag.id}</td>

                                    <td>
                                        <span className="tag-badge">
                                            {tag.name}
                                        </span>
                                    </td>

                                    <td>{tag.tasks_count}</td>

                                    <td>
                                        <div className="table-actions">
                                            <button
                                                type="button"
                                                className="btn btn-info"
                                                onClick={() => onShow(tag)}
                                            >
                                                Ver
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-warning"
                                                onClick={() => onEdit(tag)}
                                            >
                                                Editar
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => onDelete(tag)}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default TagList;