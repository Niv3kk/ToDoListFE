import { useEffect, useState } from 'react';
import { getOne } from '../../services/category.service';

function CategoryShow({ categoryId, onClose }) {
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCategory = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await getOne(categoryId);

                setCategory(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (categoryId) {
            loadCategory();
        }
    }, [categoryId]);

    if (loading) {
        return (
            <div className="category-card">
                <p>Cargando categoría...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="category-card">
                <p className="message message-error">
                    {error}
                </p>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                >
                    Cerrar
                </button>
            </div>
        );
    }

    if (!category) {
        return null;
    }

    return (
        <div className="category-card category-detail">
            <div className="category-detail-header">
                <h2>Detalle de categoría</h2>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                >
                    Cerrar
                </button>
            </div>

            <div className="category-detail-content">
                <div className="detail-item">
                    <span>ID</span>
                    <strong>{category.id}</strong>
                </div>

                <div className="detail-item">
                    <span>Nombre</span>
                    <strong>{category.name}</strong>
                </div>

                <div className="detail-item">
                    <span>Cantidad de tareas</span>
                    <strong>{category.tasks_count}</strong>
                </div>

                <div className="detail-item">
                    <span>Fecha de creación</span>
                    <strong>
                        {category.created_at
                            ? new Date(category.created_at).toLocaleString()
                            : 'Sin información'}
                    </strong>
                </div>

                <div className="detail-item">
                    <span>Última actualización</span>
                    <strong>
                        {category.updated_at
                            ? new Date(category.updated_at).toLocaleString()
                            : 'Sin información'}
                    </strong>
                </div>
            </div>
        </div>
    );
}

export default CategoryShow;