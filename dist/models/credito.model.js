"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Credito = void 0;
const mongoose_1 = require("mongoose");
const creditoSchema = new mongoose_1.Schema({
    Folio: {
        type: String,
        required: [true, 'El folio es requerido']
    },
    RGI: {
        type: String,
        required: [true, 'El RGI es requerido']
    },
    Nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    Total: {
        type: String,
        required: [true, 'El total es requerido']
    },
    Fecha: {
        type: String,
        required: [true, 'La fecha es requerida']
    },
    Concepto: {
        type: String,
        required: [true, 'El concepto es requerido']
    },
});
exports.Credito = mongoose_1.model('Credito', creditoSchema);
