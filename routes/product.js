import express from "express";
import { ProductoDao } from "../dao/ProductoDao.js";
import { authMiddleware } from "../middlewares/Auth.js";
const router = express.Router();
const productoDao = new ProductoDao();


// GET a api/productos
router.get('/', async (_req, res) => {
    const products = await productoDao.getAll();
    products
        ? res.status(200).json({ "success": true, "data": products })
        : res.status(400).json({ "success": false, "message": "An error occurred" })
})

// GET a api/productos/:id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await productoDao.getProductById(id);
    product
        ? res.status(200).json({ "success": true, "data": product })
        : res.status(400).json({ "success": false, "message": "An error occurred" })
})


// POST a api/productos
router.post('/', authMiddleware, async (req, res) => {
    const { body } = req;
    const newProduct = await productoDao.createProduct(body);
    newProduct
        ? res.status(200).json({ "success": true, "message": `Product added with ID: ${newProduct._id}` })
        : res.status(400).json({ "success": false, "message": "An error occurred" })
})

// PUT a api/productos/:id
router.put('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const wasUpdated = await productoDao.updateProductById(id, body);
    wasUpdated
        ? res.status(200).json({ "success": true, "message": "Product updated" })
        : res.status(404).json({ "success": false, "message": "An error occurred" })
})


// DELETE /api/productos/id
router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const wasDeleted = await productoDao.deleteProductById(id)
    wasDeleted
        ? res.status(200).json({ "success": "Product successfully removed" })
        : res.status(404).json({ "success": false, "message": "An error occurred" })
})

export default router;
