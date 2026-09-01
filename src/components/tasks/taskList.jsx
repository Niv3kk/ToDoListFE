import { useEffect, useState } from 'react';

import { getAll } from '../../services/task.service';

import Pagination from '../common/pagination';

const ITEMS_PER_PAGE = 5;

function TaskList({
    refreshKey,
    onCreate,
    onEdit,
    onShow,
    onDelete,
}) {
    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await getAll();

                setTasks(response.data);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadTasks();

    }, [refreshKey]);

    const totalPages = Math.ceil(
        tasks.length / ITEMS_PER_PAGE
    );


    const startIndex =
        (currentPage - 1) * ITEMS_PER_PAGE;


    const paginatedTasks = tasks.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    useEffect(() => {
        const availablePages = Math.max(
            1,
            Math.ceil(
                tasks.length / ITEMS_PER_PAGE
            )
        );

        if (currentPage > availablePages) {
            setCurrentPage(availablePages);
        }

    }, [tasks, currentPage]);

    if (loading) {
        return <p>Cargando tareas...</p>;
    }


    if (error) {
        return (
            <p className="message message-error">
                {error}
            </p>
        );
    }

    return (
        <section className="task-list-section">

            <div className="section-heading">

                <div>
                    <span className="section-label">
                        Gestión
                    </span>

                    <h2>Tareas</h2>
                </div>


                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={onCreate}
                >
                    + Nueva tarea
                </button>

            </div>


            <div className="table-wrapper">

                <table className="task-table">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Categoría</th>
                            <th>Etiquetas</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>


                    <tbody>

                        {tasks.length === 0 ? (

                            <tr>
                                <td
                                    colSpan="6"
                                    className="empty-table"
                                >
                                    No existen tareas registradas.
                                </td>
                            </tr>

                        ) : (

                            paginatedTasks.map((task) => (

                                <tr key={task.id}>

                                    <td>
                                        {task.id}
                                    </td>


                                    <td>
                                        <strong>
                                            {task.title}
                                        </strong>
                                    </td>


                                    <td>
                                        {task.category?.name ||
                                            'Sin categoría'}
                                    </td>


                                    <td>
                                        <div className="task-tags">

                                            {task.tags?.length > 0 ? (

                                                task.tags.map((tag) => (

                                                    <span
                                                        key={tag.id}
                                                        className="task-tag"
                                                    >
                                                        {tag.name}
                                                    </span>

                                                ))

                                            ) : (

                                                <span>
                                                    Sin etiquetas
                                                </span>

                                            )}

                                        </div>
                                    </td>


                                    <td>

                                        <span
                                            className={
                                                task.is_completed
                                                    ? 'status status-completed'
                                                    : 'status status-pending'
                                            }
                                        >
                                            {task.is_completed
                                                ? 'Completada'
                                                : 'Pendiente'}
                                        </span>

                                    </td>


                                    <td>

                                        <div className="table-actions">

                                            <button
                                                type="button"
                                                className="btn btn-info"
                                                onClick={() =>
                                                    onShow(task)
                                                }
                                            >
                                                Ver
                                            </button>


                                            <button
                                                type="button"
                                                className="btn btn-warning"
                                                onClick={() =>
                                                    onEdit(task)
                                                }
                                            >
                                                Editar
                                            </button>


                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() =>
                                                    onDelete(task)
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

export default TaskList;