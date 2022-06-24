import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 100
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        max: 500
    },
    code: {
        type: String,
        required: true,
        max: 8,
        unique: true
    },
    image: {
        type: String,
        max: 250
    },
    stock: {
        type: Number,
        required: true,
        max: 1000
    }
})

export const ProductosModel = mongoose.model("productos", Schema);