const express = require("express");
const {faker} = require("@faker-js/faker");

const {Router} = express;
const routerProducto = Router();
const multer = require("multer");
const storage = multer({destinantion: "/upload"});
const PORT = process.env.PORT || 8080;

let prodContainer = require('../clases/contenedorProducto')
const {optionsMySQL} = require('../config/options.js')

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
