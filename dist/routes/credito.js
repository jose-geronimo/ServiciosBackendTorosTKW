"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const credito_model_1 = require("../models/credito.model");
const token_1 = __importDefault(require("../classes/token"));
const autenticacion_1 = require("../middlewares/autenticacion");
const creditoRoutes = express_1.Router();
//CREAR CREDITO
creditoRoutes.post('/create', (req, res) => {
    const credito = {
        folio: req.body.folio,
        RGI: req.body.RGI,
        nombre: req.body.nombre,
        total: req.body.total,
        fecha: req.body.fecha,
        concepto: req.body.concepto
    };
    credito_model_1.Credito.create(credito).then(creditoDB => {
        res.json({
            ok: true,
            user: creditoDB
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
//ACTUALIZAR CREDITO
creditoRoutes.post('/update', autenticacion_1.verificaToken, (req, res) => {
    const credito = {
        folio: req.body.folio || req.credito.folio,
        RGI: req.body.folio || req.credito.RGI,
        nombre: req.body.nombre || req.credito.nombre,
        total: req.body.total || req.credito.total,
        fecha: req.body.fecha || req.credito.fecha,
        concepto: req.body.concepto || req.credito.concepto
    };
    credito_model_1.Credito.findByIdAndUpdate(req.credito._id, credito, { new: true }, (err, creditoDB) => {
        if (err)
            throw err;
        if (!creditoDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe un credito con ese ID'
            });
        }
        const tokenCredito = token_1.default.getJwtToken({
            _id: creditoDB._id,
            folio: creditoDB.folio,
            RGI: creditoDB.RGI,
            nombre: creditoDB.nombre,
            total: creditoDB.total,
            fecha: creditoDB.fecha,
            concepto: creditoDB.concepto
        });
        res.json({
            ok: true,
            token: tokenCredito
        });
    });
});
creditoRoutes.delete('/delete', (req, res) => {
    const body = req.body._id;
    credito_model_1.Credito.findByIdAndDelete({ _id: body }).then(result => {
        res.json({
            ok: true,
            mensaje: 'Registro eliminado'
        });
    }).catch(error => {
        res.json({
            ok: false,
            mensaje: 'Registro no encontrado'
        });
    });
});
exports.default = creditoRoutes;
