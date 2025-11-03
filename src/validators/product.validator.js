import Joi from 'joi';

// Esquema para crear un producto (requiere nombre y precio)
export const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    'string.base': `"nombre" debe ser texto`,
    'string.empty': `"nombre" no puede estar vacío`,
    'string.min': `"nombre" debe tener al menos 3 caracteres`,
    'any.required': `"nombre" es un campo requerido`
  }),
  description: Joi.string().allow('').optional(),
  price: Joi.number().positive().precision(2).required().messages({
    'number.base': `"precio" debe ser un número`,
    'number.positive': `"precio" debe ser un número positivo`,
    'any.required': `"precio" es un campo requerido`
  })
});

// Esquema para actualizar (todo opcional)
export const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional(),
  description: Joi.string().allow('').optional(),
  price: Joi.number().positive().precision(2).optional(),
  image_url: Joi.string().uri().optional() // Permitir actualizar la imagen manualmente
}).min(1); // Requiere al menos un campo para actualizar