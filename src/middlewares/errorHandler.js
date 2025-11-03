// Este middleware se encarga de capturar todos los errores
export const errorHandler = (err, req, res, next) => {
  console.error(err); // Loguear el error completo

  // Detectar errores de validación de Joi
  if (err.isJoi) {
    return res.status(400).json({
      type: 'Validation Error',
      details: err.details.map(detail => detail.message)
    });
  }
  
  // Detectar errores de "No Encontrado" (que podemos lanzar como 'err.status = 404')
  if (err.status === 404) {
    return res.status(404).json({
      message: err.message || 'Recurso no encontrado'
    });
  }

  // Error genérico del servidor
  return res.status(500).json({
    message: 'Algo salió mal en el servidor.',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
};