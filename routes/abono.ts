import { Response, Request, Router } from "express";
import { Abono } from '../models/abono.model';
import bcrypt from 'bcrypt';
import Token from '../classes/token';
import { verificaToken } from '../middlewares/autenticacion';

const abonoRoutes = Router();

//CREAR USUARIO
abonoRoutes.post('/create', (req: Request, res: Response) => {
    const abono = {
        usuario: req.body.usuario,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        telefono: req.body.telefono
    };

    Abono.create(abono).then(abonoDB => {
        res.json({
            ok: true,
            abono: abonoDB
        })
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });



});

//ACTUALIZAR USUARIO
abonoRoutes.post('/update', verificaToken, (req: any, res: Response) => {

    const abono = {
        nombre: req.body.nombre || req.usuario.nombre,
        apellido: req.body.apellido || req.usuario.apellido,
        direccion: req.body.direccion || req.usuario.direccion,
        telefono: req.body.telefono || req.usuario.telefono

    };

    Abono.findByIdAndUpdate(req.abono._id, abono, { new: true }, (err, abonoDB) => {

        if (err) throw err;

        if (!abonoDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe un abono con ese ID'
            });
        }

        const tokenAbono = Token.getJwtToken({
            _id: abonoDB._id,
            usuario: abonoDB.usuario,
            nombre: abonoDB.nombre,
            apellido: abonoDB.apellido,
            direccion: abonoDB.direccion,
            telefono: abonoDB.telefono
        });

        res.json({
            ok: true,
            token: tokenAbono
        });


    });
});

abonoRoutes.delete('/delete', (req: Request, res: Response) => {
    const body = req.body._id;

    Abono.findByIdAndDelete({ _id: body }).then(
        result => {
            res.json({
                ok: true,
                mensaje: 'abono eliminado'
            });
        }).catch(error => {
                res.json({
                    ok: false,
                    mensaje: 'abono no encontrado'
                });
            });
        
});

export default abonoRoutes;