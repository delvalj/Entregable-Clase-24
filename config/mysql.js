const Knex = require('knex').default;
const optionsMySQL = require('../config/options.js')

const knex = Knex({
    client: 'mysql2',
    connection: optionsMySQL
});

const ejecutar = async () => {
    await knex.schema.dropTableIfExists("articulos");
    await knex.schema.createTable("articulos", (table) => {
        table.increments("id").primary().notNullable();
        table.string("titulo", 80).notNullable();
        table.float("price").notNullable();
        table.string("thumbnail", 250).notNullable();
        table.integer('code').notNullable();
    });

    await knex("articulos").insert([
        {titulo: "Producto precargado 1", price: 9.99, thumbnail: `https://unsplash.com/photos/i2S8ONaKuyQ` , code: 2251628},
        {titulo: "Producto precargado 2", price: 8.88, thumbnail: `https://unsplash.com/photos/ed6aAKKP0Ns`, code: 2251667},
    ]);

    console.log(await knex.from("articulos").select("*"));

    await knex.destroy()
}

ejecutar();
