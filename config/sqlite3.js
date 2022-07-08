const Knex = require('knex').default;
const moment = require('moment');

// const options = {
//    filename: '/DB/ecommerce.sqlite'
// };

const knex = Knex({
    client: 'sqlite3',
    connection: { filename: '../DB/ecommerce.sqlite'},
    useNullAsDefault: true
});

const ejecutar = async () => {
    await knex.schema.dropTableIfExists('mensajes');

    await knex.schema.createTable('mensajes', (table) => {
        table.increments("id").primary().notNullable();
        table.string("author", 15).notNullable();
        table.string("text", 250).notNullable();
        table.dateTime("date").notNullable();
    });

    const fechaActual = moment();
    const fechaformateada = fechaActual.format("DD/MM/YYYY HH:MM:SS");

    await knex("mensajes").insert([
        {author: "Frank Zappa", text: "Muffin Men", date: fechaformateada},
        {author: "Pink Floyd", text: "Have a Cigar", date: fechaformateada},
    ]);

    console.log(await knex.from("mensajes").select("*"));
    await knex.destroy()

}

ejecutar();
