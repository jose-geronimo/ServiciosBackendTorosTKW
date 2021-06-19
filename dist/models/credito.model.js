"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Credito = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const creditoSchema = new mongoose_1.Schema({
    folio: {
        type: String,
        required: [true, 'El folio es requerido']
    },
    RGI: {
        type: String,
        unique: true,
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
creditoSchema.method('compararPassword', function (password = '') {
    if (bcrypt_1.default.compareSync(password, this.password)) {
        return true;
    }
    else {
        return false;
    }
});
exports.Credito = mongoose_1.model('Credito', creditoSchema);
