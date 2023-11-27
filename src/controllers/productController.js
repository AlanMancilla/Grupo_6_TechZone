const { validationResult } = require('express-validator');
const db = require("../database/models");
const { Op } = require("sequelize");

const productDetailControllers = {
  productList: (req, res) => {
    db.Product.findAll().then((products) => {
      res.render("products/list", { products });
    });
  },
  productSearch: (req, res) => {
    db.Product.findAll(
      {
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${req.query.search}%` } },
            { category: { [Op.like]: `%${req.query.search}%` } },
            { description: { [Op.like]: `%${req.query.search}%` } }
          ]
        }
      }
    ).then((products) => {
      res.render("products/list", { products});
    });
  },
  productCreate: (req, res) => {
    res.render("products/productcreate.ejs");
  },
  productDetail: (req, res) => {
    db.Product.findOne({ where: { id: req.params.id } }).then((product) => {
      res.render("products/productDetail.ejs", { product: product });
    });
  },
  productCreatePost: (req, res) => {

    const errors = validationResult(req);

      if (errors.isEmpty()) {
        let newProduct = {
          name: req.body.name,
          description: req.body.description,
          category: req.body.category,
          image: req.file?.filename || "noImageFound.png",
          price: Number(req.body.price),
          discount: Number(req.body.discount),
        };

        db.Product.create(newProduct).then((product) => {
          res.redirect("/");
        });
    } else {
      return res.render("products/productcreate", {
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },
  productEdit: (req, res) => {
    db.Product.findOne({ where: { id: req.params.id } }).then((product) => {
      res.render("products/productEdit.ejs", { product: product });
    });
  },
  productEditPUT: (req, res) => {

    const errors = validationResult(req);

    let productEdit;

    if (errors.isEmpty()) {

      let imageUpdate = "";

      if (!req.file) {
        imageUpdate = req.body.image_edit;
      } else {
        imageUpdate = req.file.filename;
      }

      productEdit = {
        id: Number(req.params.id),
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        image: imageUpdate,
        price: Number(req.body.price),
        discount: Number(req.body.discount),
      };

      db.Product.update(productEdit, {
        where: {
          id: Number(req.params.id),
        },
      })
        .then((product) => {
          res.redirect(`/productDetail/${Number(req.params.id)}`);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {

      productEdit = {
        id: Number(req.params.id),
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        image: req.body.image_edit,
        price: Number(req.body.price),
        discount: Number(req.body.discount),
      };
      
      return res.render("products/productEdit", {
        errors: errors.mapped(),
        product: productEdit,
      });
    }
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
