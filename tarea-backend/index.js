const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors()); // Permite peticiones desde el frontend
app.use(express.json()); // Permite leer JSON

let tareas = []; // En memoria (luego lo pasaremos a base de datos)

// Obtener todas las tareas
app.get('/tareas', (req, res) => {
  res.json(tareas);
});

// Agregar nueva tarea
app.post('/tareas', (req, res) => {
  const nuevaTarea = { texto: req.body.texto, completada: false };
  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
});

// Cambiar estado de una tarea (completada/no completada)
app.put('/tareas/:index', (req, res) => {
  const index = req.params.index;
  if (tareas[index]) {
    tareas[index].completada = !tareas[index].completada;
    res.json(tareas[index]);
  } else {
    res.status(404).json({ error: 'Tarea no encontrada' });
  }
});

// Eliminar una tarea
app.delete('/tareas/:index', (req, res) => {
  const index = req.params.index;
  if (tareas[index]) {
    const eliminada = tareas.splice(index, 1);
    res.json(eliminada[0]);
  } else {
    res.status(404).json({ error: 'Tarea no encontrada' });
  }
});

app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});