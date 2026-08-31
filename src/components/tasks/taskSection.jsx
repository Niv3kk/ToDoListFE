import { useState } from 'react';

import TaskCreate from './taskCreate';
import TaskEdit from './taskEdit';
import TaskList from './taskList';
import TaskShow from './taskShow';

import ConfirmModal from '../common/ConfirmModal';

import { remove } from '../../services/task.service';

import '../../styles/tasks.css';


function TaskSection() {
    const [refreshKey, setRefreshKey] = useState(0);

    const [showCreate, setShowCreate] = useState(false);

    const [selectedTask, setSelectedTask] = useState(null);

    const [taskToShow, setTaskToShow] = useState(null);

    const [taskToDelete, setTaskToDelete] = useState(null);

    const [deleteLoading, setDeleteLoading] = useState(false);

    const [deleteError, setDeleteError] = useState(null);


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

    const handleDeleteClick = (task) => {
        setDeleteError(null);
        setTaskToDelete(task);
    };


    const handleCancelDelete = () => {
        setTaskToDelete(null);
        setDeleteError(null);
    };


    const handleConfirmDelete = async () => {
        if (!taskToDelete) {
            return;
        }

        try {
            setDeleteLoading(true);
            setDeleteError(null);

            await remove(taskToDelete.id);

            if (selectedTask?.id === taskToDelete.id) {
                setSelectedTask(null);
            }

            if (taskToShow === taskToDelete.id) {
                setTaskToShow(null);
            }

            setTaskToDelete(null);

            refreshTasks();

        } catch (error) {
            setDeleteError(error.message);
        } finally {
            setDeleteLoading(false);
        }
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

            {deleteError && (
                <p className="message message-error delete-error">
                    {deleteError}
                </p>
            )}

            <TaskList
                refreshKey={refreshKey}
                onCreate={handleOpenCreate}
                onEdit={handleEdit}
                onShow={handleShow}
                onDelete={handleDeleteClick}
            />

            {taskToDelete && (
                <ConfirmModal
                    title="Eliminar tarea"
                    message={`¿Estás seguro de eliminar la tarea "${taskToDelete.title}"?`}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                    loading={deleteLoading}
                />
            )}

        </section>
    );
}


export default TaskSection;