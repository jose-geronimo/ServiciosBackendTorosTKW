import { Response, Request, Router } from "express";
import { Clientes } from '../models/clientes.model';
import { verificaToken } from '../middlewares/autenticacion';

const clienteRoutes = Router();
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
    Clientes.create(client).then(clientDB => {
        res.json({
            ok: true,
            user: clientDB
        })
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
})
//ACTUALIZAR CLIENTE
clienteRoutes.post('/update', (req: any, res: Response) => {

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

    Clientes.findByIdAndUpdate(req.body._id, client, { new: true }, (err, userDB) => {

        if (err) throw err;

        if (!userDB) {
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
//ELIMINAR CLIENTE
clienteRoutes.delete('/delete', (req: Request, res: Response) => {
    const body = req.body._id;

    Clientes.findByIdAndDelete({ _id: body }).then(
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

export default clienteRoutes;