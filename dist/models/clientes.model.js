"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clientes = void 0;
const mongoose_1 = require("mongoose");
const clienteSchema = new mongoose_1.Schema({
    folio: {
        type: String,
        unique: true,
        required: [true, 'El folio es requerido']
    },
    Clase: {
        type: String,
        required: [true, 'La clase es requerida']
    },
    Direccion: {
        type: String,
        required: [true, 'La direccion es requerido']
    },
    Edad: {
        type: String,
        required: [true, 'La edad es requerido']
    },
    FechaIngreso: {
        type: String,
        required: [true, 'La fecha de ingreso es requerida']
    },
    Horario: {
        type: String,
        required: [true, 'El horario es requerido']
    },
    Mensualidad: {
        type: String,
        required: [true, 'La mensualidad es requerido']
    },
    Nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    RGI: {
        type: String,
        required: [true, 'El RGI es requerido']
    },
    Telefono: {
        type: String,
        required: [true, 'El telefono es requerido']
    },
});
exports.Clientes = mongoose_1.model('Clientes', clienteSchema);
