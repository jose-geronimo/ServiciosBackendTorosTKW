"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Credito = void 0;
const mongoose_1 = require("mongoose");
const creditoSchema = new mongoose_1.Schema({
    folio: {
        type: String,
        required: [true, 'El folio es requerido']
    },
    RGI: {
        type: String,
        required: [true, 'El RGI es requerido']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    total: {
        type: String,
        required: [true, 'El total es requerido']
    },
    fecha: {
        type: String,
        required: [true, 'La fecha es requerida']
    },
    concepto: {
        type: String,
        required: [true, 'El concepto es requerido']
    },
});
exports.Credito = mongoose_1.model('Credito', creditoSchema);
