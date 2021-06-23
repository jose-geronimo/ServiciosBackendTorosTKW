"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventario = void 0;
const mongoose_1 = require("mongoose");
//import bcrypt from 'bcrypt';
const inventarioSchema = new mongoose_1.Schema({
    Folio: {
        type: String,
        unique: true,
        required: [true, 'El Folio es requerido']
    },
    Costo: {
        type: String,
        required: [true, 'El costo es requerido']
    },
    Existencia: {
        type: String,
        required: [true, 'La Existencia es requerida']
    },
    Nombre: {
        type: String,
        required: [true, 'El Nombre es requerido']
    },
    Precio: {
        type: String,
        required: [true, 'El Precio es requeridp']
    }
});
exports.Inventario = mongoose_1.model('Inventario', inventarioSchema);
