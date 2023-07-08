const {router} = require('../routes/usuarios.js');
const {routerAuth} = require('../routes/auth.js');
const { routerBuscar } = require('../routes/buscar.js');
const {routerCategory} = require('../routes/categorias.js');
const {routerProduct} = require('../routes/productos.js');
const { routerUpload } = require('../routes/uploads.js');


const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.js');
const fileUpload = require('express-fileupload');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios',
            uploads: '/api/uploads',
        };

        //Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi app
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());
        //Lectura y parseo del body
        this.app.use(express.json());
        //Directorio público
        this.app.use(express.static('public'));
        //Fileupload - carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath : true,
        }));
    }

    routes() {
        this.app.use(this.paths.auth, routerAuth);
        this.app.use(this.paths.buscar, routerBuscar);
        this.app.use(this.paths.categorias, routerCategory);
        this.app.use(this.paths.productos, routerProduct);
        this.app.use(this.paths.usuarios, router);
        this.app.use(this.paths.uploads, routerUpload);
    }

    listen() {
        this.app.listen(this.port, () => {
           console.log('Servidor corriendo en puerto: ', this.port)
        });
    }
}

module.exports = {
    Server
}
