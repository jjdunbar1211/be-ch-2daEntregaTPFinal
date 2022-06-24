import express from "express";
import { CarritoDao } from "../dao/CarritoDao.js";
import { ProductoDao } from "../dao/ProductoDao.js";

const router = express.Router();
const carritoDao = new CarritoDao();

// POST a /api/carrito
router.post('/', async (_req, res) => {
    const newCart = await carritoDao.createCart();
    newCart
        ? res.status(200).json({ "success": true, "message": `Product added with ID: ${newCart._id}` })
        : res.status(500).json({ "success": false, "message": "An error occurred" })
})

// DELETE a /api/carrito/id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const wasDeleted = await carritoDao.deleteCartById(id);
    wasDeleted
        ? res.status(200).json({ "success": true, "message": "cart successfully removed" })
        : res.status(404).json({ "success": false, "message": "An error occurred" })
})

// POST a /api/carrito/:id/productos
router.post('/:id/productos', async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const productExists = await ProductoDao.exists(body.productId);
    if (productExists) {
        await carritoDao.saveProductToCart(id, body)
        res.status(200).json({ "success": true, "message": "product successfully added to cart" })
    } else {
        res.status(404).json({ "success": false, "message": "An error occurred" });
    }
})

// GET a /api/carrito/:id/productos
router.get('/:id/productos', async (req, res) => {
    const { id } = req.params;
    const cartProducts = await carritoDao.getAllProductsFromCart(id);
    cartProducts
        ? res.status(200).json({ "success": true, "data": cartProducts })
        : res.status(404).json({ "success": false, "message": "An error occurred" })
})

// DELETE a /api/carrito/:id/productos/:id_prod
router.delete('/:id/productos/:id_prod', async (req, res) => {
    const { id, id_prod } = req.params;
    const wasDeleted = await carritoDao.deleteProductFromCart(id, id_prod);
    wasDeleted
        ? res.status(200).json({ "success": true, "message": "Product is no longer in the cart" })
        : res.status(400).json({ "success": false, "message": "An error occurred" })
})

export default router;