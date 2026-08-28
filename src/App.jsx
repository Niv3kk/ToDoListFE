import { useEffect } from 'react';
import CategoryList from "./components/categories/categoryList";
import "./App.css"

function App() {
  return (
    <>
      <h1>ToDoList App</h1>

      <CategoryList/>

    </>
  );
}

export default App;