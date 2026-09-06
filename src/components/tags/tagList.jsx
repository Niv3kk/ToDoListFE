import { useEffect, useState } from 'react';

import { getAll } from '../../services/tag.service';

import Pagination from '../common/Pagination';

const ITEMS_PER_PAGE = 5;

function TagList({
    refreshKey,
    onShow,
    onEdit,
    onDelete,
}) {
    const [tags, setTags] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);

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

    const totalPages = Math.ceil(
        tags.length / ITEMS_PER_PAGE
    );


    const startIndex =
        (currentPage - 1) * ITEMS_PER_PAGE;


    const paginatedTags = tags.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );


    useEffect(() => {

        const availablePages = Math.max(
            1,
            Math.ceil(
                tags.length / ITEMS_PER_PAGE
            )
        );


        if (currentPage > availablePages) {
            setCurrentPage(availablePages);
        }

    }, [tags, currentPage]);

    if (loading) {
        return (
            <p>
                Cargando etiquetas...
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
        <section className="tag-list-section">

            <div className="section-heading">

                <div>

                    <span className="section-label">
                        Gestión
                    </span>

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

                            paginatedTags.map((tag) => (

                                <tr key={tag.id}>

                                    <td>
                                        {tag.id}
                                    </td>


                                    <td>

                                        <span className="tag-badge">
                                            {tag.name}
                                        </span>

                                    </td>


                                    <td>
                                        {tag.tasks_count}
                                    </td>


                                    <td>

                                        <div className="table-actions">

                                            <button
                                                type="button"
                                                className="btn btn-info"
                                                onClick={() =>
                                                    onShow(tag)
                                                }
                                            >
                                                Ver
                                            </button>


                                            <button
                                                type="button"
                                                className="btn btn-warning"
                                                onClick={() =>
                                                    onEdit(tag)
                                                }
                                            >
                                                Editar
                                            </button>


                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() =>
                                                    onDelete(tag)
                                                }
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


            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

        </section>
    );
}

export default TagList;