import { Response, Request, Router } from "express";
import { Inventario } from '../models/inventario.model';
//import { verificaToken } from '../middlewares/autenticacion';

const inventarioRoutes = Router();

//OBTENER PRODUCTOS
inventarioRoutes.get('/inventario', (req, res) => {
  Inventario.find()
    .then(
      results => {
        res.json({
          results: results
        });
      }).catch(error => console.error(error));
});

//Crear Producto
inventarioRoutes.post('/add', (req, res) => {
  const producto = {
    Folio: req.body.Folio,
    Costo: req.body.Costo,
    Existencia: req.body.Existencia,
    Nombre: req.body.Nombre,
    Precio: req.body.Precio
  };
  Inventario.create(producto).then(
    productDB => {
      res.json({
        ok: true,
        user: productDB
      })
    }).catch(err => {
      res.json({
        ok: false,
        err
      });
    });
})

//ACTUALIZAR PRODUCTO
inventarioRoutes.post('/update/:_id', (req: any, res: Response) => {
  const producto = {
    Folio: req.body.Folio,
    Costo: req.body.Costo,
    Existencia: req.body.Existencia,
    Nombre: req.body.Nombre,
    Precio: req.body.Precio
  };  
  
  Inventario.findByIdAndUpdate(req.params._id, producto, { new: true }, (err, productDB) => {

    if (err) throw err;

    if (!productDB) {
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

//BORRAR PRODUCTO
inventarioRoutes.delete('/product/:_id', (req: any, res: Response) => {
  const body = req.params._id;

    Inventario.findByIdAndDelete({ _id: body }).then(
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

export default inventarioRoutes;