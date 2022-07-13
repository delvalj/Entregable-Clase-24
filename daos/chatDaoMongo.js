const contenedorChatMongo = require("../clases/contenedorChatMongo.js");
const { MongoClient } = require("mongodb");

const mongo = new MongoClient(
  "mongodb+srv://delvalj:Joaquin712@cluster0.vznga.mongodb.net/?retryWrites=true&w=majority"
);
mongo.connect();

class ProductosDaoMongo extends contenedorChatMongo {
  constructor() {
    super("ecommerce", "mensajes");
  }

  /**
   * Metodo para guardar un usuario.
   * Recibo un objeto usuario como param.
   * @param {Object} producto
   */
  async metodoSave(mensaje) {
    await mongo
      .db(this.nombreTabla)
      .collection(this.nombreCollection)
      .insertOne({
        nombre: mensaje.nombre,
        apellido: mensaje.apellido,
        author: mensaje.author,
        id: mensaje.id,
        edad: mensaje.edad,
        alias: mensaje.alias,
        avatar: mensaje.avatar,
        text: [mensaje.text]
      });
  }

  /**
   * Metodo para obtener todos los usuarios
   * @returns
   */
  async getAll() {
    const resultado = await mongo
      .db(this.nombreTabla)
      .collection(this.nombreCollection)
      .find()
      .toArray();
    console.log(resultado);
    return resultado;
  }
}

module.exports = ProductosDaoMongo;
