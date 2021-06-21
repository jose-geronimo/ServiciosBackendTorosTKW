import { model, Schema } from 'mongoose';

const clienteSchema: Schema<IClientes> = new Schema({
    folio:{
        type: String,
        unique: true,
        required: [true, 'El folio es requerido']
    },
    Clase:{
        type: String,
        required: [true, 'La clase es requerida']
    },
    Direccion:{
        type: String,
        required: [true, 'La direccion es requerido']
    },
    Edad:{
        type: String,
        required: [true, 'La edad es requerido']
    },
    FechaIngreso:{
        type: String,
        required: [true, 'La fecha de ingreso es requerida']
    },
    Horario:{
        type: String,
        required: [true, 'El horario es requerido']
    },
    Mensualidad:{
        type: String,
        required: [true, 'La mensualidad es requerido']
    },
    Nombre:{
        type: String,
        required: [true, 'El nombre es requerido']
    },
    RGI:{
        type: String,
        required: [true, 'El RGI es requerido']
    },
    Telefono:{
        type: String,
        required: [true, 'El telefono es requerido']
    },
});

interface IClientes extends Document{
    folio: string;
    Clase: string;
    Direccion: string;
    Edad: string;
    FechaIngreso: string;
    Horario: string;
    Mensualidad: string;
    Nombre: string;
    RGI: string;
    Telefono: string;    
}

export const Clientes = model<IClientes>('Clientes', clienteSchema);