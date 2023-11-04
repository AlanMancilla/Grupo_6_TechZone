const fs = require("fs");
const path = require("path");
const db = require("../database/models");

const productsFilePath = path.join(__dirname, "../database/products.json");

const productDetailControllers = {
    productList: (req, res) => {

        db.Product.findAll()
            .then(products => {
                res.render('products/list', { products })
            })

    },
    productCreate: (req, res) => {
        res.render('products/productcreate.ejs')
    },
    productDetail: (req, res) => {

        db.Product.findOne({ where: { id: req.params.id }, })
            .then(product => {
                res.render('products/productDetail.ejs', { product: product })
            })

    },
    productCreatePost: (req, res) => {

        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        let new_id = products[products.length - 1].id + 1;
        req.body.id = new_id;

        let newProduct = req.body;
        newProduct.image = req.file.filename;

        products.push(newProduct);

        fs.writeFile(productsFilePath, JSON.stringify(products), "utf-8", (err) => {
            if (err) {
                console.error("Error al escribir el archivo:", err);
            } else {
                console.log("Archivo sobrescrito exitosamente.");
            }
        });

        res.render('products/productDetail.ejs', { product: newProduct });

    },
    productEdit: (req, res) => {

        db.Product.findOne({ where: { id: req.params.id }, })
            .then(product => {
                res.render('products/productEdit.ejs', { product: product })
            })

    },
    productEditPUT: (req, res) => {


        let imageUpdate = "";

        if (!req.file) {
            imageUpdate = req.body.image_edit;
        } else {
            imageUpdate = req.file.filename;
        }

        let productEdit = {
            id: Number(req.params.id),
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            image: imageUpdate,
            price: Number(req.body.price),
            discount: Number(req.body.discount),
        };

        db.Product.update(productEdit,
            {
                where: {
                    id: Number(req.params.id)
                }
            })
            .then(product => {
                res.redirect(`/productDetail/${Number(req.params.id)}`);
            })
            .catch((error) => {
                console.error(error);
            })

    },
    productDELETE: (req, res) => {
        db.Product.destroy({
            where: {
                id: Number(req.params.id),
            },
        })
            .then((deletedRecord) => {
                if (deletedRecord === 1) {
                    console.log("Producto eliminado exitosamente");
                    res.redirect("/");
                } else {
                    console.log("Producto no encontrado");
                    res.status(404).send("Producto no encontrado");
                }
            })
            .catch((error) => {
                console.log("Ha ocurrido un error", error);
                res.status(500).send("Ha ocurrido un error al eliminar el producto");
            });
    },
};


module.exports = productDetailControllers;
