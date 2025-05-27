const mongoose = require('mongoose');

// Conexión a MongoDB (usa variables de entorno en Render)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.error(err));

// Modelo de Tarea
const Tarea = mongoose.model('Tarea', {
  texto: String,
  completada: { type: Boolean, default: false }
});

// Ruta POST (ejemplo)
app.post('/tareas', async (req, res) => {
  const tarea = new Tarea({ texto: req.body.texto });
  await tarea.save();
  res.status(201).json(tarea);
});