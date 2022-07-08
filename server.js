const express = require("express");
const app = express();
const {engine} = require("express-handlebars");
const PORT = process.env.PORT || 8080;
const { routerProducto } = require('./routers/routerProd');

const {Server: HttpServer} = require('http');
const {Server: SocketServer} = require('socket.io');
const httpServer = new HttpServer(app);
const socketServer = new SocketServer(httpServer);
const Knex = require('knex').default;


// // const knexsqlite = require('./config/options.js');


// // // Conexion con SQLite
// // const knexSQLite = Knex({
// //     client: 'sqlite3',
// //     connection: { filename: './DB/ecommerce.sqlite' },
// //     useNullAsDefault: true
// // })

// const ContenedorChat = require('./clases/contenedorChat.js');
// const contenedor = new ContenedorChat('mensajes', knexSQLite);

const contenedorChat = require('./clases/contenedorChatFirebase.js');
const contenedor = new contenedorChat('mensajes')

const messages = [];

// Middleware para parsear el Body. Sin esto no obtenemos el Body. SIEMPRE QUE USAMOS POST HAY QUE USARLO.
// El body llega como strings. Lo que hace el middleware es transformarlo en JSON y mandarlo a la funcion que debe controlarlo.
app.use(express.json());
// Hace lo mismo pero con dato de formularios. Un form en HTML viene en forma de URL encoded y esto lo trasnforma en formulario.
app.use(express.urlencoded({extended: true}));

// Va a buscar en la carpeta PUBLIC si existe el archivo buscado.
app.use(express.static("public"));

// Router
app.use("/", routerProducto);

// Views Engine
app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        defaultLayout: "index.hbs",
    })
);

app.set("views", "./hbs_views");
app.set("view engine", "hbs");

// CH A T

socketServer.on('connection', async (socket) => {
    socket.emit('messages', await contenedor.readMessage());
    socket.on('new_message', async (mensaje) => {
        console.log(mensaje);
        await contenedor.saveMessage(mensaje);
        let mensajes = await contenedor.readMessage();
        socketServer.sockets.emit('messages', mensajes);
    });

});
httpServer.listen(PORT, () => {
    console.log(`Corriendo server en el puerto ${PORT}!`);
});
