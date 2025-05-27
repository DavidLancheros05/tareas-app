// 1. Importaciones
const express = require('express');
const cors = require('cors');

// 2. Inicialización de Express
const app = express();
const port = process.env.PORT || 3000;

// 3. Middlewares
app.use(cors());
app.use(express.json());

// 4. Datos en memoria (solución temporal)
let tareas = [];

// 5. Rutas
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

// 6. Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});