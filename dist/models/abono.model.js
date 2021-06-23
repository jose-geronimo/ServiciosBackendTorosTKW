"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Abono = void 0;
const mongoose_1 = require("mongoose");
const abonoSchema = new mongoose_1.Schema({
    Folio: {
        type: String,
        required: [true, 'El folio es requerido']
    },
    Nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    Fecha: {
        type: String,
        required: [true, 'La fecha es requerida']
    },
    Monto: {
        type: String,
        required: [true, 'El monto es requerido']
    },
});
exports.Abono = mongoose_1.model('Abono', abonoSchema);
