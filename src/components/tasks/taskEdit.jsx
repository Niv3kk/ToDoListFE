import { useEffect, useState } from 'react';

import { update } from '../../services/task.service';

import {
    getAll as getAllCategories,
} from '../../services/category.service';

import {
    getAll as getAllTags,
} from '../../services/tag.service';


function TaskEdit({
    task,
    onUpdated,
    onCancel,
}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [isCompleted, setIsCompleted] = useState(false);

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const [loadingData, setLoadingData] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        const loadData = async () => {
            try {
                setLoadingData(true);
                setError(null);

                const [
                    categoriesResponse,
                    tagsResponse,
                ] = await Promise.all([
                    getAllCategories(),
                    getAllTags(),
                ]);

                setCategories(categoriesResponse.data);
                setTags(tagsResponse.data);

                setTitle(task.title);
                setDescription(task.description);

                setCategoryId(
                    String(task.category?.id ?? '')
                );

                setSelectedTags(
                    task.tags?.map((tag) => tag.id) ?? []
                );

                setIsCompleted(task.is_completed);

            } catch (error) {
                setError(error.message);
            } finally {
                setLoadingData(false);
            }
        };

        if (task) {
            loadData();
        }
    }, [task]);


    const handleTagsChange = (event) => {
        const values = Array.from(
            event.target.selectedOptions,
            (option) => Number(option.value)
        );

        setSelectedTags(values);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        setError(null);

        if (!title.trim()) {
            setError('El título es obligatorio.');
            return;
        }

        if (!description.trim()) {
            setError('La descripción es obligatoria.');
            return;
        }

        if (!categoryId) {
            setError('Debes seleccionar una categoría.');
            return;
        }

        if (selectedTags.length === 0) {
            setError('Debes seleccionar al menos una etiqueta.');
            return;
        }

        try {
            setLoading(true);

            const updatedTask = {
                title: title.trim(),
                description: description.trim(),
                category_id: Number(categoryId),
                tags: selectedTags,
                is_completed: isCompleted,
            };

            await update(task.id, updatedTask);

            onUpdated();

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };


    if (!task) {
        return null;
    }


    if (loadingData) {
        return (
            <div className="task-card">
                <p>Cargando tarea...</p>
            </div>
        );
    }


    return (
        <div className="task-card">
            <div className="task-card-header">
                <div>
                    <span className="section-label">
                        Edición
                    </span>

                    <h2>Editar tarea</h2>
                </div>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onCancel}
                >
                    Cancelar
                </button>
            </div>


            <form
                onSubmit={handleSubmit}
                className="task-form"
            >
                <div className="form-group">
                    <label htmlFor="edit-task-title">
                        Título
                    </label>

                    <input
                        id="edit-task-title"
                        type="text"
                        value={title}
                        onChange={(event) =>
                            setTitle(event.target.value)
                        }
                    />
                </div>


                <div className="form-group">
                    <label htmlFor="edit-task-description">
                        Descripción
                    </label>

                    <textarea
                        id="edit-task-description"
                        value={description}
                        onChange={(event) =>
                            setDescription(event.target.value)
                        }
                        rows="4"
                    />
                </div>


                <div className="task-form-grid">
                    <div className="form-group">
                        <label htmlFor="edit-task-category">
                            Categoría
                        </label>

                        <select
                            id="edit-task-category"
                            value={categoryId}
                            onChange={(event) =>
                                setCategoryId(
                                    event.target.value
                                )
                            }
                        >
                            <option value="">
                                Selecciona una categoría
                            </option>

                            {categories.map((category) => (
                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>


                    <div className="form-group">
                        <label htmlFor="edit-task-status">
                            Estado
                        </label>

                        <select
                            id="edit-task-status"
                            value={
                                isCompleted ? '1' : '0'
                            }
                            onChange={(event) =>
                                setIsCompleted(
                                    event.target.value === '1'
                                )
                            }
                        >
                            <option value="0">
                                Pendiente
                            </option>

                            <option value="1">
                                Completada
                            </option>
                        </select>
                    </div>
                </div>


                <div className="form-group">
                    <label htmlFor="edit-task-tags">
                        Etiquetas
                    </label>

                    <select
                        id="edit-task-tags"
                        multiple
                        value={selectedTags.map(String)}
                        onChange={handleTagsChange}
                        size="5"
                    >
                        {tags.map((tag) => (
                            <option
                                key={tag.id}
                                value={tag.id}
                            >
                                {tag.name}
                            </option>
                        ))}
                    </select>

                    <small className="form-help">
                        Mantén Ctrl presionado para seleccionar
                        varias etiquetas.
                    </small>
                </div>


                {error && (
                    <p className="message message-error">
                        {error}
                    </p>
                )}


                <div className="form-actions">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading
                            ? 'Actualizando...'
                            : 'Actualizar tarea'}
                    </button>

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default TaskEdit;