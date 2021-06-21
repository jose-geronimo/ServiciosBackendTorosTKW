import Server from './classes/server';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoutes  from './routes/usuario';
import creditoRoutes  from './routes/credito';
import abonoRoutes from './routes/abono';
import clienteRoutes from './routes/clientes';

const server = new Server();

//Body parser
server.app.use( bodyParser.urlencoded({ extended: true }));
server.app.use( bodyParser.json() );

//Rutas de mi app
server.app.use('/user', userRoutes)
server.app.use('/credito', creditoRoutes)
server.app.use('/abono', abonoRoutes)
server.app.use('/cliente', clienteRoutes)

//Conectar la BD
const uri =
"mongodb+srv://Jondalar:e9mKFiwdcmSD8262@torostkw.iaq0g.mongodb.net/TorosTKW?retryWrites=true&w=majority";

mongoose.connect(uri,
    {useNewUrlParser: true, useCreateIndex: true}, (err)=>{
        if(err)throw err;
        console.log("Base de datos conectada");
    })

 //Levantar express
 server.start(()=>{
     console.log(`Servidor corriendo en el puerto ${ server.port}`);
 })
