import { useEffect, useState } from 'react';
import { getAll } from '../../services/task.service';

function TaskList({
    refreshKey,
    onCreate,
    onEdit,
    onShow,
}) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                            tasks.map((task) => (
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
                                                onClick={() => onShow(task)}
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

export default TaskList;