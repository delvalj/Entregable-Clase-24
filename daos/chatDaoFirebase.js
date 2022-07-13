const admin = require("firebase-admin");
const serviceAccount = require("../db/coderback-74f26.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://coderback-74f26.firebase.io",
});

const ContenedorFirebase = require('../clases/contenedorChatFirebase.js');
const db = admin.firestore();

class chatDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('mensajes');
    }

/**
   * Metodo para guardar el mensaje en base de datos.
   * @param message
   */

 async saveMessage(message) 
 {
     const query = db.collection(this.nombreCollection);
     const mensaje = query.doc(message.id);
 
     const mostrarXPantalla = await mensaje.create({
         author: message.author,
         nombre: message.nombre,
         apellido: message.apellido,
         id: message.id,
         edad: message.edad,
         alias: message.alias,
         text: message.text,
         avatar: message.avatar
         
     });
     return mostrarXPantalla;
   }
 
   /**
    * Metodo para obtener todos los mensajes y renderizarlo por pantalla
    */
  //  async readMessage() {
  //    const query = db.collection(this.nombreCollection);
  //    const resultados = (await query.get()).docs;
  //    if (!resultados) {
  //      console.log("No users");
  //      return ('No users :(');
  //    } else {
  //      const result = resultados.map((resultado) => resultado.data());
  //      return result;
  //    }
  //  }
   async readMessage() {
    const query = db.collection(this.nombreCollection);
    const resultados = (await query.get()).docs;
    if (!resultados) {
      console.log("No users");
      return ('No users :(');
    } else {
      const result = resultados.map((resultado) => resultado.data());
      return result;
    }
  }
}

module.exports = chatDaoFirebase;