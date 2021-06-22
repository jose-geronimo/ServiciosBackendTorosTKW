import Server from './classes/server';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoutes  from './routes/usuario';
import creditoRoutes  from './routes/credito';
import abonoRoutes from './routes/abono';
import clienteRoutes from './routes/clientes';

const server = new Server();
const cors = require('cors');
//Body parser
server.app.use( bodyParser.urlencoded({ extended: true }));
server.app.use( bodyParser.json() );

//Rutas de mi app
server.app.use('/user', userRoutes)
server.app.use('/credito', creditoRoutes)
server.app.use('/abono', abonoRoutes)
server.app.use('/cliente', clienteRoutes)
server.app.all("*", (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
server.app.use(cors());

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
