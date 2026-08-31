import { useState } from 'react';

import TagCreate from './tagCreate';
import TagEdit from './tagEdit';
import TagList from './tagList';
import TagShow from './tagShow';

import ConfirmModal from '../common/ConfirmModal';

import { remove } from '../../services/tag.service';

import '../../styles/tags.css';


function TagSection() {
    const [refreshKey, setRefreshKey] = useState(0);

    const [selectedTag, setSelectedTag] = useState(null);
    const [tagToShow, setTagToShow] = useState(null);

    const [tagToDelete, setTagToDelete] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState(null);


    const refreshTags = () => {
        setRefreshKey((current) => current + 1);
    };


    const handleCreated = () => {
        refreshTags();
    };


    const handleEdit = (tag) => {
        setSelectedTag(tag);
    };


    const handleUpdated = () => {
        setSelectedTag(null);
        refreshTags();
    };


    const handleCancelEdit = () => {
        setSelectedTag(null);
    };


    const handleShow = (tag) => {
        setTagToShow(tag.id);
    };


    const handleCloseShow = () => {
        setTagToShow(null);
    };


    const handleDeleteClick = (tag) => {
        setDeleteError(null);
        setTagToDelete(tag);
    };


    const handleCancelDelete = () => {
        setTagToDelete(null);
        setDeleteError(null);
    };


    const handleConfirmDelete = async () => {
        if (!tagToDelete) {
            return;
        }

        try {
            setDeleteLoading(true);
            setDeleteError(null);

            await remove(tagToDelete.id);

            setTagToDelete(null);

            refreshTags();
        } catch (error) {
            setDeleteError(error.message);
        } finally {
            setDeleteLoading(false);
        }
    };


    return (
        <section className="tag-section">
            <div className="module-header">
                
                <h1>Módulo de etiquetas</h1>

                <p>
                    Administra las etiquetas que pueden
                    asociarse a las tareas.
                </p>
            </div>

            <div className="tag-grid">
                <TagCreate
                    onCreated={handleCreated}
                />

                {selectedTag && (
                    <TagEdit
                        tag={selectedTag}
                        onUpdated={handleUpdated}
                        onCancel={handleCancelEdit}
                    />
                )}
            </div>

            {tagToShow && (
                <TagShow
                    tagId={tagToShow}
                    onClose={handleCloseShow}
                />
            )}

            {deleteError && (
                <p className="message message-error delete-error">
                    {deleteError}
                </p>
            )}

            <TagList
                refreshKey={refreshKey}
                onShow={handleShow}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
            />

            {tagToDelete && (
                <ConfirmModal
                    title="Eliminar etiqueta"
                    message={`¿Estás seguro de eliminar la etiqueta "${tagToDelete.name}"?`}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                    loading={deleteLoading}
                />
            )}
        </section>
    );
}

export default TagSection;