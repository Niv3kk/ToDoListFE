import { useEffect, useState } from 'react';

import { create } from '../../services/task.service';
import { getAll as getAllCategories } from '../../services/category.service';
import { getAll as getAllTags } from '../../services/tag.service';


function TaskCreate({
    onCreated,
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
    const [success, setSuccess] = useState(null);


    useEffect(() => {
        const loadOptions = async () => {
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

            } catch (error) {
                setError(error.message);
            } finally {
                setLoadingData(false);
            }
        };

        loadOptions();
    }, []);


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
        setSuccess(null);

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

            const task = {
                title: title.trim(),
                description: description.trim(),
                category_id: Number(categoryId),
                tags: selectedTags,
                is_completed: isCompleted,
            };

            const response = await create(task);

            setSuccess(
                response.message ||
                'Tarea creada correctamente.'
            );

            setTitle('');
            setDescription('');
            setCategoryId('');
            setSelectedTags([]);
            setIsCompleted(false);

            onCreated();

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };


    if (loadingData) {
        return (
            <div className="task-card">
                <p>Cargando formulario...</p>
            </div>
        );
    }


    return (
        <div className="task-card">
            <div className="task-card-header">
                <div>
                    <span className="section-label">
                        Nueva
                    </span>

                    <h2>Crear tarea</h2>
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
                    <label htmlFor="task-title">
                        Título
                    </label>

                    <input
                        id="task-title"
                        type="text"
                        value={title}
                        onChange={(event) =>
                            setTitle(event.target.value)
                        }
                        placeholder="Ej: Terminar proyecto React"
                    />
                </div>


                <div className="form-group">
                    <label htmlFor="task-description">
                        Descripción
                    </label>

                    <textarea
                        id="task-description"
                        value={description}
                        onChange={(event) =>
                            setDescription(event.target.value)
                        }
                        placeholder="Describe la tarea..."
                        rows="4"
                    />
                </div>


                <div className="task-form-grid">
                    <div className="form-group">
                        <label htmlFor="task-category">
                            Categoría
                        </label>

                        <select
                            id="task-category"
                            value={categoryId}
                            onChange={(event) =>
                                setCategoryId(event.target.value)
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
                        <label htmlFor="task-status">
                            Estado
                        </label>

                        <select
                            id="task-status"
                            value={isCompleted ? '1' : '0'}
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
                    <label htmlFor="task-tags">
                        Etiquetas
                    </label>

                    <select
                        id="task-tags"
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

                {success && (
                    <p className="message message-success">
                        {success}
                    </p>
                )}


                <div className="form-actions">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading
                            ? 'Guardando...'
                            : 'Crear tarea'}
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

export default TaskCreate;