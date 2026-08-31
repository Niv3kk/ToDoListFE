import { useEffect, useState } from 'react';

import { getOne } from '../../services/task.service';

function TaskShow({
    taskId,
    onClose,
}) {
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTask = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await getOne(taskId);

                setTask(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (taskId) {
            loadTask();
        }
    }, [taskId]);

    if (loading) {
        return (
            <div className="task-card">
                <p>Cargando información de la tarea...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="task-card">
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

    if (!task) {
        return null;
    }

    return (
        <div className="task-card task-detail">
            <div className="task-card-header">
                <div>
                    <span className="section-label">
                        Información
                    </span>

                    <h2>Detalle de tarea</h2>
                </div>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                >
                    Cerrar
                </button>
            </div>

            <div className="task-detail-content">

                <div className="detail-item">
                    <span>ID</span>
                    <strong>{task.id}</strong>
                </div>

                <div className="detail-item">
                    <span>Título</span>
                    <strong>{task.title}</strong>
                </div>

                <div className="detail-item">
                    <span>Estado</span>

                    <strong>
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
                    </strong>
                </div>

                <div className="detail-item detail-item-full">
                    <span>Descripción</span>
                    <strong>
                        {task.description || 'Sin descripción'}
                    </strong>
                </div>

                <div className="detail-item">
                    <span>Categoría</span>
                    <strong>
                        {task.category?.name || 'Sin categoría'}
                    </strong>
                </div>

                <div className="detail-item detail-item-full">
                    <span>Etiquetas</span>

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
                            <strong>Sin etiquetas</strong>
                        )}
                    </div>
                </div>

                <div className="detail-item">
                    <span>Fecha de creación</span>
                    <strong>
                        {task.created_at
                            ? new Date(
                                  task.created_at
                              ).toLocaleString()
                            : 'Sin información'}
                    </strong>
                </div>

                <div className="detail-item">
                    <span>Última actualización</span>
                    <strong>
                        {task.updated_at
                            ? new Date(
                                  task.updated_at
                              ).toLocaleString()
                            : 'Sin información'}
                    </strong>
                </div>

            </div>
        </div>
    );
}

export default TaskShow;