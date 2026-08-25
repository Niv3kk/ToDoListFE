import { useEffect } from 'react';
import { getAll } from './services/task.service';

function App() {
  useEffect(() => {
    const obtenerTareas = async () => {
      try {
        const response = await getAll();

        console.log('Respuesta de tareas:', response);
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
      }
    };

    obtenerTareas();
  }, []);

  return (
    <>
      <h1>Hola Mundo</h1>
    </>
  );
}

export default App;