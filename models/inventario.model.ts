import { model, Schema } from 'mongoose';
//import bcrypt from 'bcrypt';

const inventarioSchema: Schema<IInventario> = new Schema({
    Folio:{
        type: String,
        unique: true,
        required: [true, 'El Folio es requerido']
    },
    Costo:{
        type: String,
        required: [true, 'El costo es requerido']
    },
    Existencia:{
        type: String,
        required: [true, 'La Existencia es requerida']
    },
    Nombre:{
        type: String,
        required: [true, 'El Nombre es requerido']
    },
    Precio:{
        type: String,
        required: [true, 'El Precio es requeridp']
    }
});
/*
abonoSchema.method('compararPassword', function( password: string = ''): boolean {

    if (  bcrypt.compareSync( password, this.password ) ) {
        return true;
    } else {
        return false;
    }

});*/

interface IInventario extends Document{
    Folio: string;
    Costo: string;
    Existencia: string;
    Nombre: string;
    Precio: string;
}

export const Inventario = model<IInventario>('Inventario', inventarioSchema);