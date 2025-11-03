import express from 'express';
import cors from 'cors';
import 'dotenv/config'; // Carga las variables de entorno
import productRoutes from './routes/products.routes.js';
import logger from './middlewares/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';

// Inicialización de Express
const app = express();

// Configuración de Middlewares base
app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json()); // Middleware para parsear JSON
app.use(logger); // Middleware de Morgan para logging

// Rutas de la API
app.use('/api/products', productRoutes);

// Página de inicio básica
app.get('/', (req, res) => {
  res.send('🍓 API de La Dulce Miga funcionando! ✨');
});

// Middleware de Manejo de Errores (Debe ir al final)
app.use(errorHandler);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT} `);
});