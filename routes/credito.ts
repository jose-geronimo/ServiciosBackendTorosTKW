import { Response, Request, Router } from "express";
import { Credito } from '../models/credito.model';
import { verificaToken } from '../middlewares/autenticacion';

const creditoRoutes = Router();

//CREAR CREDITO
creditoRoutes.post('/add', (req: Request, res: Response) => {
    const credit = {
        folio: req.body.folio,
        RGI: req.body.RGI,
        nombre: req.body.nombre,
        total: req.body.total,
        fecha: req.body.fecha,
        concepto: req.body.concepto
    };
    Credito.create(credit).then(creditoDB => {
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
creditoRoutes.post('/update', (req: any, res: Response) => {

    const credito = {
        folio: req.body.folio,
        RGI: req.body.folio,
        nombre: req.body.nombre,
        total: req.body.total,
        fecha: req.body.fecha,
        concepto: req.body.concepto
    };

    Credito.findByIdAndUpdate(req.body._id, credito, { new: true }, (err, creditoDB) => {

        if (err) throw err;

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