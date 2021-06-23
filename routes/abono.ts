import { Response, Request, Router } from "express";
import { Abono } from '../models/abono.model';
import bcrypt from 'bcrypt';
import Token from '../classes/token';
import { verificaToken } from '../middlewares/autenticacion';

const abonoRoutes = Router();


//OBTENER ABONO
abonoRoutes.get('/abonos/:_id', (req, res) => {
    Abono.find()
        .then(results => {
            res.json({
                results: results
            });
        }).catch(error => console.error(error));
});


//ENVIAR EL ABONO
abonoRoutes.post('/abonos/add', (req, res) => {
    const abono = {
        Folio: req.body.Folio,
        Nombre: req.body.Nombre,
        Fecha: req.body.Fecha,
        Monto: req.body.Monto 
    };
    Abono.create(abono).then(abonoDB => {
        res.json({
            ok: true,
            user: abonoDB
        })
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
})
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
abonoRoutes.delete('/delete/:_id', (req: Request, res: Response) => {
    const body = req.params._id;

    Abono.findByIdAndDelete({ _id: body }).then(
        result => {
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

export default abonoRoutes;