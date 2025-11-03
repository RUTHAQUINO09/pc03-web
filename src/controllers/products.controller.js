import { pool } from '../config/db.js';
import { getRandomImage } from '../services/externalAPI.service.js';
import { createProductSchema, updateProductSchema } from '../validators/product.validator.js';

// Controlador para OBTENER TODOS los productos
export const getAllProducts = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    next(error); // Pasa el error al errorHandler
  }
};

// Controlador para OBTENER UN producto por ID
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    
    if (result.rowCount === 0) {
      const error = new Error('Producto no encontrado');
      error.status = 404;
      return next(error);
    }
    
    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// Controlador para CREAR un producto
export const createProduct = async (req, res, next) => {
  try {
    // 1. Validar la entrada
    const validatedData = await createProductSchema.validateAsync(req.body);
    const { name, description, price } = validatedData;

    // 2. Obtener imagen aleatoria (API Externa)
    const imageUrl = await getRandomImage();

    // 3. Insertar en la BD
    const query = `
      INSERT INTO products (name, description, price, image_url) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *;
    `;
    const values = [name, description, price, imageUrl];
    
    const result = await pool.query(query, values);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    // Si el error es de Joi, errorHandler lo capturará
    next(error);
  }
};

// Controlador para ACTUALIZAR un producto
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // 1. Validar la entrada
    const validatedData = await updateProductSchema.validateAsync(req.body);
    const { name, description, price, image_url } = validatedData;
    
    // 2. Obtener el producto actual (para actualizar solo campos enviados)
    const currentProduct = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (currentProduct.rowCount === 0) {
      const error = new Error('Producto no encontrado');
      error.status = 404;
      return next(error);
    }

    // 3. Fusionar datos
    const dataToUpdate = {
      name: name || currentProduct.rows[0].name,
      description: description || currentProduct.rows[0].description,
      price: price || currentProduct.rows[0].price,
      image_url: image_url || currentProduct.rows[0].image_url
    };

    // 4. Ejecutar actualización
    const query = `
      UPDATE products 
      SET name = $1, description = $2, price = $3, image_url = $4
      WHERE id = $5 
      RETURNING *;
    `;
    const values = [dataToUpdate.name, dataToUpdate.description, dataToUpdate.price, dataToUpdate.image_url, id];
    
    const result = await pool.query(query, values);

    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// Controlador para ELIMINAR un producto
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    
    if (result.rowCount === 0) {
      const error = new Error('Producto no encontrado');
      error.status = 404;
      return next(error);
    }
    
    // 204 No Content es estándar para DELETE exitoso
    res.status(204).send(); 
  } catch (error) {
    next(error);
  }
};