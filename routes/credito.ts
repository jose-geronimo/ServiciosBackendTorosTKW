import { Response, Request, Router } from "express";
import { Credito } from '../models/credito.model';
import bcrypt from 'bcrypt';
import Token from '../classes/token';
import { verificaToken } from '../middlewares/autenticacion';

const creditoRoutes = Router();

//CREAR CREDITO
creditoRoutes.post('/create', (req: Request, res: Response) => {
    const credito = {
        folio: req.body.folio,
        RGI: req.body.RGI,
        nombre: req.body.nombre,
        total: req.body.total,
        fecha: req.body.fecha,
        concepto: req.body.concepto
    };

    Credito.create(credito).then(creditoDB => {
        res.json({
            ok: true,
            user: creditoDB
        })
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });



});

//ACTUALIZAR CREDITO
creditoRoutes.post('/update', verificaToken, (req: any, res: Response) => {

    const credito = {
        folio: req.body.folio || req.credito.folio,
        RGI: req.body.folio || req.credito.RGI,
        nombre: req.body.nombre || req.credito.nombre,
        total: req.body.total || req.credito.total,
        fecha: req.body.fecha || req.credito.fecha,
        concepto: req.body.concepto || req.credito.concepto
    };

    Credito.findByIdAndUpdate(req.credito._id, credito, { new: true }, (err, creditoDB) => {

        if (err) throw err;

        if (!creditoDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe un credito con ese ID'
            });
        }

        const tokenCredito = Token.getJwtToken({
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

creditoRoutes.delete('/delete', (req: Request, res: Response) => {
    const body = req.body._id;

    Credito.findByIdAndDelete({ _id: body }).then(
        result => {
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

export default creditoRoutes;