import { useState } from 'react';

import TaskCreate from './taskCreate';
import TaskEdit from './taskEdit';
import TaskList from './taskList';
import TaskShow from './taskShow';

import '../../styles/tasks.css';

function TaskSection() {
    const [refreshKey, setRefreshKey] = useState(0);

    const [showCreate, setShowCreate] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [taskToShow, setTaskToShow] = useState(null);

    const refreshTasks = () => {
        setRefreshKey((current) => current + 1);
    };

    const handleOpenCreate = () => {
        setSelectedTask(null);
        setTaskToShow(null);
        setShowCreate(true);
    };

    const handleCloseCreate = () => {
        setShowCreate(false);
    };

    const handleCreated = () => {
        setShowCreate(false);
        refreshTasks();
    };

    const handleEdit = (task) => {
        setShowCreate(false);
        setTaskToShow(null);
        setSelectedTask(task);
    };

    const handleUpdated = () => {
        setSelectedTask(null);
        refreshTasks();
    };

    const handleCancelEdit = () => {
        setSelectedTask(null);
    };

    const handleShow = (task) => {
        setShowCreate(false);
        setSelectedTask(null);
        setTaskToShow(task.id);
    };

    const handleCloseShow = () => {
        setTaskToShow(null);
    };

    return (
        <section className="task-section">
            <div className="module-header">
                <h1>Módulo de tareas</h1>

                <p>
                    Crea y administra las tareas de la aplicación.
                </p>
            </div>

            {showCreate && (
                <TaskCreate
                    onCreated={handleCreated}
                    onCancel={handleCloseCreate}
                />
            )}

            {selectedTask && (
                <TaskEdit
                    task={selectedTask}
                    onUpdated={handleUpdated}
                    onCancel={handleCancelEdit}
                />
            )}

            {taskToShow && (
                <TaskShow
                    taskId={taskToShow}
                    onClose={handleCloseShow}
                />
            )}

            <TaskList
                refreshKey={refreshKey}
                onCreate={handleOpenCreate}
                onEdit={handleEdit}
                onShow={handleShow}
            />
        </section>
    );
}

export default TaskSection;