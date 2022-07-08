const express = require("express");
const {faker} = require("@faker-js/faker");

const {Router} = express;
const routerProducto = Router();
const multer = require("multer");
const storage = multer({destinantion: "/upload"});
const PORT = process.env.PORT || 8080;

let prodContainer = require('../clases/contenedorProducto')
const {optionsMySQL} = require('../config/options.js')

routerProducto.get("/", async (req, res, next) => {
    const productos = new prodContainer(optionsMySQL, 'articulos');
    const showProductos = await productos.getAll();
    res.render("main", {showProductos});
});

const armarMock = () => {
    return {
        nombres: faker.name.firstName(),
        apellidos: faker.name.lastName(),
        colores:  faker.color.human()
    }
}
// asi se hace el get indicando cuantos usuarios quiero por params.
// http://localhost:8080/testFaker/?cant=55

routerProducto.get("/productos-test", (req, res) => {
    let {cant = 5} = req.query ;
    const mocks = [];

    for(let i = 0; i < cant; i++) {
        mocks.push(armarMock());
    }
    res.send(mocks);
});

const productoSubido = storage.fields([
    {title: "title", thumbnail: "thumbnail", price: "price", code: 'code'},
]);

routerProducto.post("/", productoSubido, async (req, res) => {
    let produc = new prodContainer(optionsMySQL, 'articulos');
    if (
        req.body.title === "" ||
        req.body.price === "" ||
        req.body.thumbnail === "" ||
        req.body.code === ""
    ) {
        res.status(400).send({
            error: "No se pudo cargar el producto. Complete los campos vacios.",
        });
    } else {
        await produc.metodoSave(req.body);
        res.redirect(`http://localhost:${PORT}`);
    }
});

module.exports = {routerProducto};
