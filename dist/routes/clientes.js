"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientes_model_1 = require("../models/clientes.model");
const clienteRoutes = express_1.Router();
//OBTENER CLIENTES
clienteRoutes.get('/clientes', (req, res) => {
    clientes_model_1.Clientes.find()
        .then(results => {
        res.json({
            results: results
        });
    }).catch(error => console.error(error));
});
//CREAR UN CLIENTE
clienteRoutes.post('/add', (req, res) => {
    const client = {
        folio: req.body.folio,
        RGI: req.body.RGI,
        Nombre: req.body.Nombre,
        FechaIngreso: req.body.FechaIngreso,
        Direccion: req.body.Direccion,
        Telefono: req.body.Telefono,
        Edad: req.body.Edad,
        Horario: req.body.Horario,
        Clase: req.body.Clase,
        Mensualidad: req.body.Mensualidad
    };
    clientes_model_1.Clientes.create(client).then(clientDB => {
        res.json({
            ok: true,
            user: clientDB
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
//ACTUALIZAR CLIENTE
clienteRoutes.post('/update/:_id', (req, res) => {
    const client = {
        folio: req.body.folio,
        RGI: req.body.RGI,
        Nombre: req.body.Nombre,
        FechaIngreso: req.body.FechaIngreso,
        Direccion: req.body.Direccion,
        Telefono: req.body.Telefono,
        Edad: req.body.Edad,
        Horario: req.body.Horario,
        Clase: req.body.Clase,
        Mensualidad: req.body.Mensualidad
    };
    clientes_model_1.Clientes.findByIdAndUpdate(req.params._id, client, { new: true }, (err, clienteDB) => {
        if (err)
            throw err;
        if (!clienteDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe un cliente con ese ID'
            });
        }
        res.json({
            ok: true,
        });
    });
});
//ELIMINAR CLIENTE
clienteRoutes.delete('/delete/:_id', (req, res) => {
    const body = req.params._id;
    clientes_model_1.Clientes.findByIdAndDelete({ _id: body }).then(result => {
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
exports.default = clienteRoutes;
