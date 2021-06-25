"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventario_model_1 = require("../models/inventario.model");
const autenticacion_1 = require("../middlewares/autenticacion");
const inventarioRoutes = express_1.Router();
//OBTENER PRODUCTOS
inventarioRoutes.get('/inventario', autenticacion_1.verificaToken, (req, res) => {
    inventario_model_1.Inventario.find()
        .then(results => {
        res.json({
            results: results
        });
    }).catch(error => console.error(error));
});
//Crear Producto
inventarioRoutes.post('/add', autenticacion_1.verificaToken, (req, res) => {
    const producto = {
        Folio: req.body.Folio,
        Costo: req.body.Costo,
        Existencia: req.body.Existencia,
        Nombre: req.body.Nombre,
        Precio: req.body.Precio
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
inventarioRoutes.post('/update/:_id', autenticacion_1.verificaToken, (req, res) => {
    const producto = {
        Folio: req.body.Folio,
        Costo: req.body.Costo,
        Existencia: req.body.Existencia,
        Nombre: req.body.Nombre,
        Precio: req.body.Precio
    };
    inventario_model_1.Inventario.findByIdAndUpdate(req.params._id, producto, { new: true }, (err, productDB) => {
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
inventarioRoutes.delete('/product/:_id', autenticacion_1.verificaToken, (req, res) => {
    const body = req.params._id;
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
