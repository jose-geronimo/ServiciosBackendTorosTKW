"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventario_model_1 = require("../models/inventario.model");
//import { verificaToken } from '../middlewares/autenticacion';
const inventarioRoutes = express_1.Router();
inventarioRoutes.get('/inventario', (req, res) => {
    inventario_model_1.Inventario.find()
        .then(results => {
        res.json({
            results: results
        });
    }).catch(error => console.error(error));
});
//Crear Producto
inventarioRoutes.post('/add/Inventario', (req, res) => {
    const producto = {
        Folio: req.body.folio,
        Costo: req.body.RGI,
        Existencia: req.body.Nombre,
        Nombre: req.body.FechaIngreso,
        Precio: req.body.Direccion,
    };
    inventario_model_1.Inventario.create(producto).then(productDB => {
        res.json({
            ok: true,
            user: productDB
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
//ACTUALIZAR PRODUCTO
inventarioRoutes.post('/product/', (req, res) => {
    const producto = {
        Folio: req.body.folio,
        Costo: req.body.RGI,
        Existencia: req.body.Nombre,
        Nombre: req.body.FechaIngreso,
        Precio: req.body.Direccion,
    };
    inventario_model_1.Inventario.findByIdAndUpdate(req.body._id, producto, { new: true }, (err, productDB) => {
        if (err)
            throw err;
        if (!productDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }
        res.json({
            ok: true,
        });
    });
});
//BORRAR PRODUCTO
inventarioRoutes.delete('/product/', (req, res) => {
    const body = req.body._id;
    inventario_model_1.Inventario.findByIdAndDelete({ _id: body }).then(result => {
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
exports.default = inventarioRoutes;
