import { model, Schema } from 'mongoose';


const abonoSchema: Schema<IAbono> = new Schema({
    Folio:{
        type: String,
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



interface IAbono extends Document{
    Folio: string;
    Nombre: string;
    Fecha: string;
    Monto: string;
    compararPassword(password:string):boolean;
}

export const Abono = model<IAbono>('Abono', abonoSchema);