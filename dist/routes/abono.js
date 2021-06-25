"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const abono_model_1 = require("../models/abono.model");
const autenticacion_1 = require("../middlewares/autenticacion");
const abonoRoutes = express_1.Router();
//OBTENER ABONO
abonoRoutes.get('/abonos/:id', autenticacion_1.verificaToken, (req, res) => {
    abono_model_1.Abono.find({ "Folio": req.params.id })
        .then(results => {
        res.json({
            results: results
        });
    }).catch(error => console.error(error));
});
//ENVIAR EL ABONO
abonoRoutes.post('/add', autenticacion_1.verificaToken, (req, res) => {
    const abono = {
        Folio: req.body.Folio,
        Nombre: req.body.Nombre,
        Fecha: req.body.Fecha,
        Monto: req.body.Monto
    };
    abono_model_1.Abono.create(abono).then(abonoDB => {
        res.json({
            ok: true,
            user: abonoDB
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
/*
//ACTUALIZAR ABONO
abonoRoutes.post('/update', (req: any, res: Response) => {

    const abono = {
        Folio: req.body.folio,
        Nombre: req.body.Nombre,
        Fecha: req.body.Fecha,
        Monto: req.body.Monto
    };

    Abono.findByIdAndUpdate(req.body._id, abono, { new: true }, (err, abonoDB) => {

        if (err) throw err;

        if (!abonoDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe un abono con ese ID'
            });
        }
        res.json({
            ok: true,
        });
    });
});
*/
//ELIMINAR ABONO
abonoRoutes.delete('/delete/:_id', autenticacion_1.verificaToken, (req, res) => {
    const body = req.params._id;
    abono_model_1.Abono.findByIdAndDelete({ _id: body }).then(result => {
        res.json({
            ok: true,
            mensaje: 'Abono eliminado'
        });
    }).catch(error => {
        res.json({
            ok: false,
            mensaje: 'Abono no encontrado'
        });
    });
});
exports.default = abonoRoutes;
