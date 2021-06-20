import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const abonoSchema: Schema<IAbono> = new Schema({
    usuario:{
        type: String,
        unique: true,
        required: [true, 'El usuario es requerido']
    },
    password:{
        type: String,
        required: [true, 'La contraseña es requerida']
    },
    nombre:{
        type: String,
        required: [true, 'El nombre es requerido']
    },
    apellido:{
        type: String,
        required: [true, 'El apellido es requerido']
    },
    direccion:{
        type: String,
        required: [true, 'La direccion es requerida']
    },
    telefono:{
        type: String,
        required: [true, 'El telefono es requerido']
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
    usuario: string;
    password: string;
    nombre: string;
    apellido: string;
    direccion: string;
    telefono: string;
    compararPassword(password:string):boolean;
}

export const Abono = model<IAbono>('Abono', abonoSchema);