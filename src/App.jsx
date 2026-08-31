import { useState } from 'react';
import CategoryCreate from './components/categories/categoryCreate';
import CategoryEdit from './components/categories/categoryEdit';
import CategoryList from './components/categories/categoryList';
import './styles/categories.css';

function App() {
    const [refreshKey, setRefreshKey] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(null);

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

    return (
        <main className="app-container">
            <h1>To-Do App</h1>

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

            <CategoryList
                refreshKey={refreshKey}
                onEdit={handleEdit}
            />
        </main>
    );
}

export default App;