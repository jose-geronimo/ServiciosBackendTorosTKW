import { Response, Request, Router } from "express";
import { Ventas } from "../models/ventas.model";
//import { verificaToken } from '../middlewares/autenticacion';

const ventasRoutes = Router();

ventasRoutes.get('/ventas', (req, res) => {
  Ventas.find()
    .then(
      results => {
        res.json({
          results: results
        });
      }).catch(error => console.error(error));
});

//Crear Venta
ventasRoutes.post('/add', (req, res) => {
  const venta = {
    Total: req.body.Total,
    Dia: req.body.Dia,
    Mes: req.body.Mes,
    Año: req.body.Año,
    Vendedor: req.body.Vendedor,
    Efectivo: req.body.Efectivo
  };

  Ventas.create(venta).then(
    ventaDB => {
      res.json({
        ok: true,
        user: ventaDB
      })
    }).catch(err => {
      res.json({
        ok: false,
        err
      });
    });
})

export default ventasRoutes;