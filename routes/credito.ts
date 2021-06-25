import { Response, Request, Router } from "express";
import { Credito } from '../models/credito.model';
import { verificaToken } from '../middlewares/autenticacion';

const creditoRoutes = Router();

//OBTENER CLIENTES
creditoRoutes.get('/creditos', verificaToken, (req, res) => {
    Credito.find()
        .then(results => {
            res.json({
                results: results
            });
        }).catch(error => console.error(error));
});

//CREAR CREDITO
creditoRoutes.post('/add', verificaToken,(req: Request, res: Response) => {
    const credit = {
        Folio: req.body.Folio,
        RGI: req.body.RGI,
        Nombre: req.body.Nombre,
        Total: req.body.Total,
        Fecha: req.body.Fecha,
        Concepto: req.body.Concepto
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
creditoRoutes.post('/update/:_id', verificaToken, (req: any, res: Response) => {

    const credito = {
        Folio: req.body.Folio,
        RGI: req.body.RGI,
        Nombre: req.body.Nombre,
        Total: req.body.Total,
        Fecha: req.body.Fecha,
        Concepto: req.body.Concepto
    };

    Credito.findByIdAndUpdate(req.params._id, credito, { new: true }, (err, creditoDB) => {

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

creditoRoutes.delete('/delete/:_id', verificaToken, (req: Request, res: Response) => {
    const body = req.params._id;

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