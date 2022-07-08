// DESAFIO CLASE 16 SQL
const Knex = require('knex').default;
const moment = require('moment');
const {knexSQLite} = require('../config/options');

const fechaActual = moment();
const fechaformateada = fechaActual.format("DD/MM/YYYY HH:MM:SS");

/**
 * Clase Contenedor Chat
 * @type {module.ContenedorChat}
 * Constructor donde se pasan las opciones de conexion a BD y table el nombre de la tabla dentro de la BD.
 */
module.exports = class ContenedorChat {
    constructor(options, tabla) {
        this.knex = Knex(options);
        this.tabla = tabla;
    }
    /**
     * Metodo para guardar el mensaje en base de datos.
     * @param message
     */

    async saveMessage(message) {
        await knexSQLite('mensajes').insert({author: message.author, text: message.text, date: fechaformateada});
        // console.log(message);
    }

    /**
     * Metodo para obtener todos los mensajes y renderizarlo por pantalla
     */
    async readMessage() {
        try {
            let contenido = await knexSQLite.select('*').from('mensajes');
            if (contenido === '') {
                return '';
            } else {
                // console.log(contenido)
                return contenido;
            }
        } catch (error) {
            console.log("Error en getAll", error);
            return [];
        }
    }
}


