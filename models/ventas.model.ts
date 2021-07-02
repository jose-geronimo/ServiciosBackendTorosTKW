import { model, Schema } from 'mongoose';

const ventasSchema: Schema<IVentas> = new Schema({
    Total:{
        type: String,
        required: [true, 'El Total es requerido']
    },
    Dia:{
        type: String,
        required: [true, 'El Dia es requerido']
    },
    Mes:{
        type: String,
        required: [true, 'La Mes es requerida']
    },
    Año:{
        type: String,
        required: [true, 'El Año es requerido']
    },
    Vendedor:{
        type: String,
        required: [true, 'El Vendedor es requerido']
    },
    Efectivo:{
        type: String,
        required: [true, 'El Efectivo es requerido']
    },
    Cliente:{
        type: String,
        required: [true, 'El Cliente es requerido']
    }
});

interface IVentas extends Document{
    Total: string;
    Dia: string;
    Mes: string;
    Año: string;
    Vendedor: string;
    Efectivo: string;
    Cliente: string;
}

export const Ventas = model<IVentas>('Ventas', ventasSchema);