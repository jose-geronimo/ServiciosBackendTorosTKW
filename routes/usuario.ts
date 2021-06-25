import { Response, Request, Router } from "express";
import { Usuario } from '../models/usuario.model';
import bcrypt from 'bcrypt';
import Token from '../classes/token';
import { verificaToken } from '../middlewares/autenticacion';

const userRoutes = Router();

//LOGIN
userRoutes.post('/login', (req: Request, res: Response) => {
    const body = req.body;
    Usuario.findOne({ usuario: body.username }, (err: any, userDB: any) => {

        if (err) throw err;

        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Usuario incorrecto'
            });
        }

        if (userDB.compararPassword(body.password)) {

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
        } else {
            return res.json({
                ok: false,
                mensaje: 'Contraseña inválida'
            });
        }



    });

});

//GET USUARIOS
userRoutes.get('/users', verificaToken, (req, res) => {
    Usuario.find()
      .then(
        results => {
          res.json({
            results: results
          });
        }).catch(error => console.error(error));
  });

//CREAR USUARIO
userRoutes.post('/create', verificaToken ,(req: Request, res: Response) => {
    const user = {
        usuario: req.body.usuario,
        password: bcrypt.hashSync(req.body.password, 10),
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        telefono: req.body.telefono
    };

    Usuario.create(user).then(userDB => {
        res.json({
            ok: true,
            user: userDB
        })
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });



});

//ACTUALIZAR USUARIO
userRoutes.post('/update/:_id', verificaToken, (req: any, res: Response) => {

    const user = {
        password: bcrypt.hashSync(req.body.password, 10) || req.usuario.password,
        nombre: req.body.nombre || req.usuario.nombre,
        apellido: req.body.apellido || req.usuario.apellido,
        direccion: req.body.direccion || req.usuario.direccion,
        telefono: req.body.telefono || req.usuario.telefono

    };

    Usuario.findByIdAndUpdate(req.params._id, user, { new: true }, (err, userDB) => {

        if (err) throw err;

        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }

        /*const tokenUser = Token.getJwtToken({
            _id: userDB._id,
            usuario: userDB.usuario,
            nombre: userDB.nombre,
            apellido: userDB.apellido,
            direccion: userDB.direccion,
            telefono: userDB.telefono
        });*/

        res.json({
            ok: true
            //token: tokenUser
        });


    });
});

userRoutes.delete('/delete/:_id', verificaToken, (req: Request, res: Response) => {
    const body = req.params._id;

    Usuario.findByIdAndDelete({ _id: body }).then(
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

export default userRoutes;