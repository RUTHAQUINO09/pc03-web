import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

// Configuración del pool de conexiones
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Render requiere SSL para conexiones externas, 
  // pero no acepta certificados no autorizados (como los autofirmados)
  // Si te conectas desde tu máquina local a Render, SSL es necesario.
  ssl: {
    rejectUnauthorized: false
  }
});

// Probar la conexión (opcional pero recomendado)
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error al conectar con la Base de Datos 🚫', err.stack);
  } else {
    console.log('Base de Datos conectada exitosamente ☕', res.rows[0].now);
  }
});