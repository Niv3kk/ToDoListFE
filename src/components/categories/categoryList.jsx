import { useEffect, useState } from 'react';
import { getAll } from '../../services/category.service';

function CategoryList({ refreshKey, onEdit, onDelete, }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await getAll();

                setCategories(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadCategories();
    }, [refreshKey]);

    if (loading) {
        return <p>Cargando categorías...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <section className="category-list-section">
            <h2>Categorías</h2>

            <div className="table-wrapper">
                <table className="category-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Cantidad de tareas</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id}>
                                <td>{category.id}</td>

                                <td>
                                    {category.name}
                                </td>

                                <td>
                                    {category.tasks_count}
                                </td>

                                <td>
                                    <div className="table-actions">
                                        <button
                                            className="btn btn-warning"
                                            onClick={() =>
                                                onEdit(category)
                                            }
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => onDelete(category)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default CategoryList;