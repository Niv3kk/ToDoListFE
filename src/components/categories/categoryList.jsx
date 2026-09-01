import { useEffect, useState } from 'react';

import { getAll } from '../../services/category.service';

import Pagination from '../common/Pagination';

const ITEMS_PER_PAGE = 5;

function CategoryList({
    refreshKey,
    onShow,
    onEdit,
    onDelete,
}) {
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {

        const loadCategories = async () => {

            try {
                setLoading(true);
                setError(null);

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

    const totalPages = Math.ceil(
        categories.length / ITEMS_PER_PAGE
    );


    const startIndex =
        (currentPage - 1) * ITEMS_PER_PAGE;


    const paginatedCategories =
        categories.slice(
            startIndex,
            startIndex + ITEMS_PER_PAGE
        );


    useEffect(() => {

        const availablePages = Math.max(
            1,
            Math.ceil(
                categories.length /
                ITEMS_PER_PAGE
            )
        );


        if (currentPage > availablePages) {
            setCurrentPage(availablePages);
        }

    }, [categories, currentPage]);

    if (loading) {
        return (
            <p>
                Cargando categorías...
            </p>
        );
    }


    if (error) {
        return (
            <p className="message message-error">
                {error}
            </p>
        );
    }

    return (
        <section className="category-list-section">

            <div className="section-heading">

                <div>
                    <span className="section-label">
                        Gestión
                    </span>

                    <h2>Categorías</h2>
                </div>

                <span className="tag-count">
                    {categories.length} categorías
                </span>

            </div>


            <div className="table-wrapper">

                <table className="category-table">

                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Tareas</th>
                            <th>Acciones</th>
                        </tr>

                    </thead>


                    <tbody>

                        {categories.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="4"
                                    className="empty-table"
                                >
                                    No existen categorías registradas.
                                </td>

                            </tr>

                        ) : (

                            paginatedCategories.map(
                                (category) => (

                                    <tr key={category.id}>

                                        <td>
                                            {category.id}
                                        </td>


                                        <td>
                                            <strong>
                                                {category.name}
                                            </strong>
                                        </td>


                                        <td>
                                            {category.tasks_count}
                                        </td>


                                        <td>

                                            <div className="table-actions">

                                                <button
                                                    type="button"
                                                    className="btn btn-info"
                                                    onClick={() =>
                                                        onShow(category)
                                                    }
                                                >
                                                    Ver
                                                </button>


                                                <button
                                                    type="button"
                                                    className="btn btn-warning"
                                                    onClick={() =>
                                                        onEdit(category)
                                                    }
                                                >
                                                    Editar
                                                </button>


                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() =>
                                                        onDelete(category)
                                                    }
                                                >
                                                    Eliminar
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                )
                            )

                        )}

                    </tbody>

                </table>

            </div>


            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

        </section>
    );
}

export default CategoryList;