"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const credito_model_1 = require("../models/credito.model");
const autenticacion_1 = require("../middlewares/autenticacion");
const creditoRoutes = express_1.Router();
//OBTENER CLIENTES
creditoRoutes.get('/creditos', autenticacion_1.verificaToken, (req, res) => {
    credito_model_1.Credito.find()
        .then(results => {
        res.json({
            results: results
        });
    }).catch(error => console.error(error));
});
//CREAR CREDITO
creditoRoutes.post('/add', autenticacion_1.verificaToken, (req, res) => {
    const credit = {
        Folio: req.body.Folio,
        RGI: req.body.RGI,
        Nombre: req.body.Nombre,
        Total: req.body.Total,
        Fecha: req.body.Fecha,
        Concepto: req.body.Concepto
    };
    credito_model_1.Credito.create(credit).then(creditoDB => {
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
creditoRoutes.post('/update/:_id', autenticacion_1.verificaToken, (req, res) => {
    const credito = {
        Folio: req.body.Folio,
        RGI: req.body.RGI,
        Nombre: req.body.Nombre,
        Total: req.body.Total,
        Fecha: req.body.Fecha,
        Concepto: req.body.Concepto
    };
    credito_model_1.Credito.findByIdAndUpdate(req.params._id, credito, { new: true }, (err, creditoDB) => {
        if (err)
            throw err;
        if (!creditoDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe un credito con ese ID'
            });
        }
        res.json({
            ok: true,
            mensaje: 'Credito actualizado'
        });
    });
});
creditoRoutes.delete('/delete/:_id', autenticacion_1.verificaToken, (req, res) => {
    const body = req.params._id;
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
