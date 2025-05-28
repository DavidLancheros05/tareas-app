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
  console.log(`Intentando eliminar ID: ${id}`); // Debug
  
  const initialLength = tareas.length;
  tareas = tareas.filter(tarea => {
    console.log(`Comparando: ${tarea.id} (${typeof tarea.id}) vs ${id} (${typeof id})`); // Debug
    return tarea.id !== id;
  });

  if (tareas.length < initialLength) {
    res.status(200).json({ success: true });
  } else {
    res.status(404).json({ error: "ID no encontrado" });
  }
});

// Debug: Mostrar todas las rutas registradas
console.log("Rutas disponibles:");
app._router.stack.forEach((layer) => {
  if (layer.route) {
    console.log(
      `${Object.keys(layer.route.methods).join(", ").toUpperCase()} ${layer.route.path}`
    );
  }
});

app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});