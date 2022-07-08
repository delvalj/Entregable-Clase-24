
const Knex = require('knex').default;

//Conección con SQLite
const knexSQLite = Knex({
    client: 'sqlite3',
    connection: { filename: './DB/ecommerce.sqlite' },
    useNullAsDefault: true
})

const optionsMySQL = {
    host: "localhost",
    user: "root",
    port: "3306",
    password: "",
    database: "ecommerce"
};

module.exports = { knexSQLite, optionsMySQL }
