const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let tareas = [];

app.get('/tareas', (req, res) => {
  res.json(tareas);
});

app.post('/tareas', (req, res) => {
  const nuevaTarea = {
    id: Date.now().toString(),
    texto: req.body.texto,
    completada: false
  };
  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
});

// Ruta DELETE agregada
app.delete('/tareas/:id', (req, res) => {
  const id = req.params.id;
  tareas = tareas.filter(tarea => tarea.id !== id);
  res.status(200).json({ message: "Tarea eliminada" });
});

app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});