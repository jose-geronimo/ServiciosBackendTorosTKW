import { model, Schema } from 'mongoose';

const creditoSchema: Schema<ICredito> = new Schema({
    Folio:{
        type: String,
        required: [true, 'El folio es requerido']
    },
    RGI:{
        type: String,
        required: [true, 'El RGI es requerido']
    },
    Nombre:{
        type: String,
        required: [true, 'El nombre es requerido']
    },
    Total:{
        type: String,
        required: [true, 'El total es requerido']
    },
    Fecha:{
        type: String,
        required: [true, 'La fecha es requerida']
    },
    Concepto:{
        type: String,
        required: [true, 'El concepto es requerido']
    },
});

interface ICredito extends Document{
    Folio: string;
    RGI: string;
    Nombre: string;
    Total: string;
    Fecha: string;
    Concepto: string;
}

export const Credito = model<ICredito>('Credito', creditoSchema);