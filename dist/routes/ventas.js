"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ventas_model_1 = require("../models/ventas.model");
const autenticacion_1 = require("../middlewares/autenticacion");
const ventasRoutes = express_1.Router();
ventasRoutes.get('/ventas', autenticacion_1.verificaToken, (req, res) => {
    ventas_model_1.Ventas.find()
        .then(results => {
        res.json({
            results: results
        });
    }).catch(error => console.error(error));
});
//Crear Venta
ventasRoutes.post('/add', autenticacion_1.verificaToken, (req, res) => {
    const venta = {
        Total: req.body.Total,
        Dia: req.body.Dia,
        Mes: req.body.Mes,
        Año: req.body.Año,
        Vendedor: req.body.Vendedor,
        Efectivo: req.body.Efectivo,
        Cliente: req.body.Cliente
    };
    ventas_model_1.Ventas.create(venta).then(ventaDB => {
        res.json({
            ok: true,
            user: ventaDB
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
exports.default = ventasRoutes;
