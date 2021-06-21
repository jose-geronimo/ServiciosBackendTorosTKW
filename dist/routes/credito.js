"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const credito_model_1 = require("../models/credito.model");
const creditoRoutes = express_1.Router();
//CREAR CREDITO
creditoRoutes.post('/add', (req, res) => {
    const credit = {
        folio: req.body.folio,
        RGI: req.body.RGI,
        nombre: req.body.nombre,
        total: req.body.total,
        fecha: req.body.fecha,
        concepto: req.body.concepto
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
creditoRoutes.post('/update', (req, res) => {
    const credito = {
        folio: req.body.folio,
        RGI: req.body.folio,
        nombre: req.body.nombre,
        total: req.body.total,
        fecha: req.body.fecha,
        concepto: req.body.concepto
    };
    credito_model_1.Credito.findByIdAndUpdate(req.body._id, credito, { new: true }, (err, creditoDB) => {
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
