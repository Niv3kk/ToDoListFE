import { useEffect, useState } from 'react';
import { getAll } from '../../services/category.service';
import "../../styles/categoryList.css"

function CategoryList({refreshKey}) {
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
        <div className="categoryList">
            <h2>Categorías</h2>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Cantidad de tareas</th>
                    </tr>
                </thead>

                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.tasks_count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CategoryList;