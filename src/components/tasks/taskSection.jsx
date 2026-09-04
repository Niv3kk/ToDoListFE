import { useState } from 'react';

import TaskCreate from './taskCreate';
import TaskList from './taskList';

import '../../styles/tasks.css';


function TaskSection() {
    const [refreshKey, setRefreshKey] = useState(0);
    const [showCreate, setShowCreate] = useState(false);


    const refreshTasks = () => {
        setRefreshKey((current) => current + 1);
    };


    const handleOpenCreate = () => {
        setShowCreate(true);
    };


    const handleCloseCreate = () => {
        setShowCreate(false);
    };


    const handleCreated = () => {
        setShowCreate(false);
        refreshTasks();
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


            <TaskList
                refreshKey={refreshKey}
                onCreate={handleOpenCreate}
            />
        </section>
    );
}

export default TaskSection;