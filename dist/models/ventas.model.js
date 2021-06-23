"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ventas = void 0;
const mongoose_1 = require("mongoose");
const ventasSchema = new mongoose_1.Schema({
    Total: {
        type: String,
        required: [true, 'El Total es requerido']
    },
    Dia: {
        type: String,
        required: [true, 'El Dia es requerido']
    },
    Mes: {
        type: String,
        required: [true, 'La Mes es requerida']
    },
    Año: {
        type: String,
        required: [true, 'El Año es requerido']
    },
    Vendedor: {
        type: String,
        required: [true, 'El Vendedor es requerido']
    },
    Efectivo: {
        type: String,
        required: [true, 'El Efectivo es requerido']
    }
});
exports.Ventas = mongoose_1.model('Ventas', ventasSchema);
