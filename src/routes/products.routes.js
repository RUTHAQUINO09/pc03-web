import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/products.controller.js';

const router = Router();

// GET /api/products -> Listar todos los productos
router.get('/', getAllProducts);

// POST /api/products -> Crear un producto
router.post('/', createProduct);

// GET /api/products/:id -> Obtener producto por ID
router.get('/:id', getProductById);

// PUT /api/products/:id -> Actualizar un producto
router.put('/:id', updateProduct);

// DELETE /api/products/:id -> Eliminar un producto
router.delete('/:id', deleteProduct);

export default router;