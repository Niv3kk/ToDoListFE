import { useState } from 'react';
import CategoryList from "./components/categories/categoryList";
import CategoryCreate from "./components/categories/categoryCreate";
import "./App.css"

function App() {

  const [refreshKey, setRefreshKey] = useState(0);

  const handleCategoryCreated = () => {
    setRefreshKey((current) => current + 1);
  };

  return (
    <>
      <h1>ToDoList App</h1>

      <CategoryCreate onCreated={handleCategoryCreated}/>
      <CategoryList refreshKey={refreshKey}/>

    </>
  );
}

export default App;