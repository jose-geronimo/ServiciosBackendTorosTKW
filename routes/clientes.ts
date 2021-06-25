import { Response, Request, Router } from "express";
import { Clientes } from '../models/clientes.model';
import { verificaToken } from '../middlewares/autenticacion';

const clienteRoutes = Router();

//OBTENER CLIENTES
clienteRoutes.get('/clientes', verificaToken, (req, res) => {
    Clientes.find()
        .then(results => {
            res.json({
                results: results
            });
        }).catch(error => console.error(error));
});


//CREAR UN CLIENTE
clienteRoutes.post('/add', verificaToken, (req, res) => {
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
clienteRoutes.post('/update/:_id', verificaToken, (req: any, res: Response) => {

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

    Clientes.findByIdAndUpdate(req.params._id, client, { new: true }, (err, clienteDB) => {

        if (err) throw err;

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
clienteRoutes.delete('/delete/:_id', verificaToken, (req: Request, res: Response) => {
    const body = req.params._id;

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