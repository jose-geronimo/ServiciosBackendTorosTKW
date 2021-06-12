import {Response, Request, Router} from "express";
import { Usuario } from '../models/usuario.model';
import bcrypt from 'bcrypt';
import Token from '../classes/token';
import { verificaToken } from '../middlewares/autenticacion';

const userRoutes = Router();

//LOGIN
userRoutes.post('/login', (req: Request, res: Response) => {
    const body = req.body;
    Usuario.findOne({usuario: body.usuario}, ( err:any, userDB:any ) => {

        if ( err ) throw err;

        if ( !userDB ) {
            return res.json({
                ok: false,
                mensaje: 'Usuario incorrecto'
            });
        }

        if (userDB.compararPassword(body.password)){

            const tokenUser = Token.getJwtToken({
                _id: userDB._id,
                usuario: userDB.usuario,
                nombre: userDB.nombre,
                apellido: userDB.apellido,
                direccion: userDB.direccion,
                telefono: userDB.telefono
            });


            res.json({
                ok: true,
                token: tokenUser
            });
        }else{
            return res.json({
                ok: false,
                mensaje: 'Contraseña inválida'
            });
        }



    });

});

//CREAR USUARIO
userRoutes.post('/create', (req: Request, res: Response) => {
    const user = {
        usuario: req.body.usuario,
        password: bcrypt.hashSync(req.body.password, 10),        
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        telefono: req.body.telefono
    };

    Usuario.create(user).then(userDB =>{
        res.json({
            ok: true,
            user: userDB
        })
    }).catch( err => {
        res.json({
            ok: false,
            err
        });
    });
    
    
    
});

//ACTUALIZAR USUARIO
userRoutes.post('/update', verificaToken, (req: any, res: Response ) => {

    const user = {
        nombre: req.body.nombre || req.usuario.nombre,
        apellido : req.body.apellido  || req.usuario.apellido,
        direccion: req.body.direccion || req.usuario.direccion,
        telefono: req.body.telefono || req.usuario.telefono

    };

    Usuario.findByIdAndUpdate( req.usuario._id, user, { new: true }, (err, userDB) => {

        if ( err ) throw err;

        if ( !userDB ) {
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }

        const tokenUser = Token.getJwtToken({
            _id: userDB._id,
            usuario: userDB.usuario,
            nombre: userDB.nombre,
            apellido: userDB.apellido,
            direccion: userDB.direccion,
            telefono: userDB.telefono
        });

        res.json({
            ok: true,
            token: tokenUser
        });


    });
});


export default userRoutes;