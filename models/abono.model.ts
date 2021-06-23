import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const abonoSchema: Schema<IAbono> = new Schema({
    Folio:{
        type: String,
        unique: true,
        required: [true, 'El folio es requerido']
    },
    Nombre:{
        type: String,
        required: [true, 'El nombre es requerido']
    },
    Fecha:{
        type: String,
        required: [true, 'La fecha es requerida']
    },
    Monto:{
        type: String,
        required: [true, 'El monto es requerido']
    },
});

abonoSchema.method('compararPassword', function( password: string = ''): boolean {

    if (  bcrypt.compareSync( password, this.password ) ) {
        return true;
    } else {
        return false;
    }

});

interface IAbono extends Document{
    Folio: string;
    Nombre: string;
    Fecha: string;
    Monto: string;
    compararPassword(password:string):boolean;
}

export const Abono = model<IAbono>('Abono', abonoSchema);