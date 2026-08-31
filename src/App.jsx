import { useState } from 'react';

import CategoryCreate from './components/categories/categoryCreate';
import CategoryEdit from './components/categories/categoryEdit';
import CategoryList from './components/categories/categoryList';
import ConfirmModal from './components/common/confirmModal';
import CategoryShow from './components/categories/categoryShow';
import TagSection from './components/tags/tagSection';
import TaskSection from './components/tasks/taskSection';

import { remove } from './services/category.service';

import './styles/categories.css';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [categoryToShow, setCategoryToShow] = useState(null);

  const refreshCategories = () => {
    setRefreshKey((current) => current + 1);
  };

  const handleCategoryCreated = () => {
    refreshCategories();
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
  };

  const handleCategoryUpdated = () => {
    setSelectedCategory(null);
    refreshCategories();
  };

  const handleCancelEdit = () => {
    setSelectedCategory(null);
  };

  const handleDeleteClick = (category) => {
    setDeleteError(null);
    setCategoryToDelete(category);
  };

  const handleCancelDelete = () => {
    setCategoryToDelete(null);
    setDeleteError(null);
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) {
      return;
    }

    try {
      setDeleteLoading(true);
      setDeleteError(null);

      await remove(categoryToDelete.id);

      setCategoryToDelete(null);

      refreshCategories();
    } catch (error) {
      setDeleteError(error.message);
    } finally {
      setDeleteLoading(false);
    }
  };
  const handleShow = (category) => {
    setCategoryToShow(category.id);
  };

  const handleCloseShow = () => {
    setCategoryToShow(null);
  };

  return (
    <main className="app-container">
      <h1>To-Do App</h1>
      
      <TaskSection/>
      
      <div className="category-grid">
        <CategoryCreate
          onCreated={handleCategoryCreated}
        />

        {selectedCategory && (
          <CategoryEdit
            category={selectedCategory}
            onUpdated={handleCategoryUpdated}
            onCancel={handleCancelEdit}
          />
        )}
      </div>

      {categoryToShow && (
        <CategoryShow
          categoryId={categoryToShow}
          onClose={handleCloseShow}
        />
      )}

      {deleteError && (
        <p className="message message-error delete-error">
          {deleteError}
        </p>
      )}

      <CategoryList
        refreshKey={refreshKey}
        onShow={handleShow}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      {categoryToDelete && (
        <ConfirmModal
          title="Eliminar categoría"
          message={`¿Estás seguro de eliminar la categoría "${categoryToDelete.name}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          loading={deleteLoading}
        />
      )}
      <TagSection />
    </main>
  );
}

export default App;