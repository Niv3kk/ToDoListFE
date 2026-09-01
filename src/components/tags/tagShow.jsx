import { useEffect, useState } from 'react';
import { getOne } from '../../services/tag.service';

function TagShow({
    tagId,
    onClose,
}) {
    const [tag, setTag] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTag = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await getOne(tagId);

                setTag(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (tagId) {
            loadTag();
        }
    }, [tagId]);

    if (loading) {
        return (
            <div className="tag-card">
                Cargando etiqueta...
            </div>
        );
    }

    if (error) {
        return (
            <div className="tag-card">
                <p className="message message-error">
                    {error}
                </p>

                <button
                    className="btn btn-secondary"
                    onClick={onClose}
                >
                    Cerrar
                </button>
            </div>
        );
    }

    if (!tag) {
        return null;
    }

    return (
        <div className="tag-card tag-detail">
            <div className="tag-detail-header">
                <div>
                    <span className="section-label">
                        Información
                    </span>

                    <h2>Detalle de etiqueta</h2>
                </div>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                >
                    Cerrar
                </button>
            </div>

            <div className="tag-detail-content">
                <div className="detail-item">
                    <span>ID</span>
                    <strong>{tag.id}</strong>
                </div>

                <div className="detail-item">
                    <span>Nombre</span>
                    <strong>{tag.name}</strong>
                </div>

                <div className="detail-item">
                    <span>Tareas asociadas</span>
                    <strong>{tag.tasks_count}</strong>
                </div>

                <div className="detail-item">
                    <span>Creada</span>
                    <strong>
                        {tag.created_at
                            ? new Date(
                                  tag.created_at
                              ).toLocaleString()
                            : 'Sin información'}
                    </strong>
                </div>

                <div className="detail-item">
                    <span>Última actualización</span>
                    <strong>
                        {tag.updated_at
                            ? new Date(
                                  tag.updated_at
                              ).toLocaleString()
                            : 'Sin información'}
                    </strong>
                </div>
            </div>
        </div>
    );
}

export default TagShow;