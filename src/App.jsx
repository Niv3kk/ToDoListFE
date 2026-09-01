import { useEffect, useState } from 'react';

import Login from './components/auth/Login';

import TaskSection from './components/tasks/TaskSection';

import CategoryCreate from './components/categories/categoryCreate';
import CategoryEdit from './components/categories/categoryEdit';
import CategoryList from './components/categories/categoryList';
import CategoryShow from './components/categories/categoryShow';

import TagSection from './components/tags/tagSection';

import ConfirmModal from './components/common/confirmModal';

import { remove } from './services/category.service';

import './styles/categories.css';


function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return Boolean(
            localStorage.getItem('token')
        );
    });

    useEffect(() => {

        const handleUnauthorized = () => {
            setIsLoggedIn(false);
        };


        window.addEventListener(
            'auth:unauthorized',
            handleUnauthorized
        );


        return () => {
            window.removeEventListener(
                'auth:unauthorized',
                handleUnauthorized
            );
        };

    }, []);


    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const [refreshKey, setRefreshKey] = useState(0);

    const [
        selectedCategory,
        setSelectedCategory
    ] = useState(null);

    const [
        categoryToShow,
        setCategoryToShow
    ] = useState(null);

    const [
        categoryToDelete,
        setCategoryToDelete
    ] = useState(null);

    const [
        deleteLoading,
        setDeleteLoading
    ] = useState(false);

    const [
        deleteError,
        setDeleteError
    ] = useState(null);


    const refreshCategories = () => {
        setRefreshKey(
            (current) => current + 1
        );
    };

    const handleCategoryCreated = () => {
        refreshCategories();
    };

    const handleEdit = (category) => {

        setCategoryToShow(null);

        setSelectedCategory(category);
    };


    const handleCategoryUpdated = () => {

        setSelectedCategory(null);

        refreshCategories();
    };


    const handleCancelEdit = () => {

        setSelectedCategory(null);
    };

    const handleShow = (category) => {

        setSelectedCategory(null);

        setCategoryToShow(category.id);
    };


    const handleCloseShow = () => {

        setCategoryToShow(null);
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


            await remove(
                categoryToDelete.id
            );

            if (
                selectedCategory?.id ===
                categoryToDelete.id
            ) {
                setSelectedCategory(null);
            }

            if (
                categoryToShow ===
                categoryToDelete.id
            ) {
                setCategoryToShow(null);
            }


            setCategoryToDelete(null);


            refreshCategories();


        } catch (error) {

            setDeleteError(
                error.message
            );

        } finally {

            setDeleteLoading(false);

        }
    };

    if (!isLoggedIn) {

        return (
            <Login
                onLogin={handleLogin}
            />
        );
    }

    return (

        <main className="app-container">


            <h1>To-Do App</h1>

            <TaskSection />

            <section className="category-section">


                <div className="module-header">

                    <h1>
                        Módulo de categorías
                    </h1>

                    <p>
                        Administra las categorías
                        de las tareas.
                    </p>

                </div>

                <div className="category-grid">


                    <CategoryCreate
                        onCreated={
                            handleCategoryCreated
                        }
                    />


                    {selectedCategory && (

                        <CategoryEdit
                            category={
                                selectedCategory
                            }
                            onUpdated={
                                handleCategoryUpdated
                            }
                            onCancel={
                                handleCancelEdit
                            }
                        />

                    )}


                </div>

                {categoryToShow && (

                    <CategoryShow
                        categoryId={
                            categoryToShow
                        }
                        onClose={
                            handleCloseShow
                        }
                    />

                )}

                {deleteError && (

                    <p className="message message-error delete-error">

                        {deleteError}

                    </p>

                )}

                <CategoryList
                    refreshKey={
                        refreshKey
                    }
                    onShow={
                        handleShow
                    }
                    onEdit={
                        handleEdit
                    }
                    onDelete={
                        handleDeleteClick
                    }
                />

                {categoryToDelete && (

                    <ConfirmModal

                        title="Eliminar categoría"

                        message={
                            `¿Estás seguro de eliminar la categoría "${categoryToDelete.name}"?`
                        }

                        onConfirm={
                            handleConfirmDelete
                        }

                        onCancel={
                            handleCancelDelete
                        }

                        loading={
                            deleteLoading
                        }

                    />

                )}


            </section>

            <TagSection />


        </main>

    );
}


export default App;