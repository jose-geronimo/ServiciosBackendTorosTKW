"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const abono_model_1 = require("../models/abono.model");
const token_1 = __importDefault(require("../classes/token"));
const autenticacion_1 = require("../middlewares/autenticacion");
const abonoRoutes = express_1.Router();
//CREAR USUARIO
abonoRoutes.post('/create', (req, res) => {
    const abono = {
        usuario: req.body.usuario,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        telefono: req.body.telefono
    };
    abono_model_1.Abono.create(abono).then(abonoDB => {
        res.json({
            ok: true,
            abono: abonoDB
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
//ACTUALIZAR USUARIO
abonoRoutes.post('/update', autenticacion_1.verificaToken, (req, res) => {
    const abono = {
        nombre: req.body.nombre || req.usuario.nombre,
        apellido: req.body.apellido || req.usuario.apellido,
        direccion: req.body.direccion || req.usuario.direccion,
        telefono: req.body.telefono || req.usuario.telefono
    };
    abono_model_1.Abono.findByIdAndUpdate(req.abono._id, abono, { new: true }, (err, abonoDB) => {
        if (err)
            throw err;
        if (!abonoDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe un abono con ese ID'
            });
        }
        const tokenAbono = token_1.default.getJwtToken({
            _id: abonoDB._id,
            usuario: abonoDB.usuario,
            nombre: abonoDB.nombre,
            apellido: abonoDB.apellido,
            direccion: abonoDB.direccion,
            telefono: abonoDB.telefono
        });
        res.json({
            ok: true,
            token: tokenAbono
        });
    });
});
abonoRoutes.delete('/delete', (req, res) => {
    const body = req.body._id;
    abono_model_1.Abono.findByIdAndDelete({ _id: body }).then(result => {
        res.json({
            ok: true,
            mensaje: 'abono eliminado'
        });
    }).catch(error => {
        res.json({
            ok: false,
            mensaje: 'abono no encontrado'
        });
    });
});
exports.default = abonoRoutes;
