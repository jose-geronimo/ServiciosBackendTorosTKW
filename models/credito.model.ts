import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const creditoSchema: Schema<ICredito> = new Schema({
    folio:{
        type: String,
        required: [true, 'El folio es requerido']
    },
    RGI:{
        type: String,
        unique: true,
        required: [true, 'El RGI es requerido']
    },
    nombre:{
        type: String,
        required: [true, 'El nombre es requerido']
    },
    total:{
        type: String,
        required: [true, 'El total es requerido']
    },
    fecha:{
        type: String,
        required: [true, 'La fecha es requerida']
    },
    concepto:{
        type: String,
        required: [true, 'El concepto es requerido']
    },
});

creditoSchema.method('compararPassword', function( password: string = ''): boolean {

    if (  bcrypt.compareSync( password, this.password ) ) {
        return true;
    } else {
        return false;
    }

});

interface ICredito extends Document{
    folio: string;
    RGI: string;
    nombre: string;
    total: string;
    fecha: string;
    concepto: string;
    compararPassword(password:string):boolean;
}

export const Credito = model<ICredito>('Credito', creditoSchema);