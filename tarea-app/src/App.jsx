import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const API_URL = 'http://localhost:3000/tareas';

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');

  // Cargar tareas al iniciar
  useEffect(() => {
    axios.get(API_URL).then((res) => {
      setTareas(res.data);
    });
  }, []);

  const agregarTarea = () => {
    if (nuevaTarea.trim() === '') return;
    axios.post(API_URL, { texto: nuevaTarea }).then((res) => {
      setTareas([...tareas, res.data]);
      setNuevaTarea('');
    });
  };

  const toggleTarea = (index) => {
    axios.put(`${API_URL}/${index}`).then((res) => {
      const nuevas = [...tareas];
      nuevas[index] = res.data;
      setTareas(nuevas);
    });
  };

  const eliminarTarea = (index) => {
    axios.delete(`${API_URL}/${index}`).then(() => {
      const nuevas = tareas.filter((_, i) => i !== index);
      setTareas(nuevas);
    });
  };

  return (
    <div className="app">
      <h1>Mis Tareas</h1>
      <input
        type="text"
        value={nuevaTarea}
        onChange={(e) => setNuevaTarea(e.target.value)}
        placeholder="Nueva tarea..."
      />
      <button onClick={agregarTarea}>Agregar</button>

      <ul>
        {tareas.map((tarea, index) => (
          <li key={index}>
            <span
              onClick={() => toggleTarea(index)}
              style={{
                textDecoration: tarea.completada ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
            >
              {tarea.texto}
            </span>
            <button onClick={() => eliminarTarea(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
