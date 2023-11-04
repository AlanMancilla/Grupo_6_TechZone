const fs = require("fs");
const path = require("path");
const db = require("../database/models");

const productsFilePath = path.join(__dirname, "../database/products.json");

const productDetailControllers = {
  productList: (req, res) => {
    /* const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); */

    db.Product.findAll().then((products) => {
      res.render("products/list", { products });
    });

    /* res.render('products/list', {products: products}) */
  },
  productCreate: (req, res) => {
    res.render("products/productcreate.ejs");
  },
  productDetail: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

    const id = req.params.id;

    const productToSend = products.find((product) => {
      return product.id == id;
    });

    res.render("products/productDetail.ejs", { product: productToSend });
  },
  productCreatePost: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

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

    res.render("products/productDetail.ejs", { product: newProduct });
  },
  productEdit: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

    const id = req.params.id;

    const productToSend = products.find((product) => {
      return product.id == id;
    });

    res.render("products/productEdit.ejs", { product: productToSend });
  },
  productEditPUT: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    const id = req.params.id;

    /* const product = products.find((product) => {return product.id == id})

        let product = req.body;
        product.image = req.file.filename; */
    let productEdit = req.body;
    productEdit.id = Number(id);
    productEdit.price = Number(productEdit.price);
    productEdit.discount = Number(productEdit.discount);

    if (!req.file) {
      productEdit.image = req.body.image_edit;
      delete productEdit.image_edit;
    } else {
      productEdit.image = req.file.filename;
    }

    products[id - 1] = productEdit;

    console.log(req.file);
    console.log(req.body);

    fs.writeFile(productsFilePath, JSON.stringify(products), "utf-8", (err) => {
      if (err) {
        console.error("Error al escribir el archivo:", err);
      } else {
        console.log("Archivo sobrescrito exitosamente.");
      }
    });

    res.render("products/productDetail.ejs", { product: productEdit });
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
