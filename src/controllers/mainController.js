const fs = require("fs");
const path = require("path");
const db = require("../database/models");

const productsFilePath = path.join(__dirname, "../database/products.json");

const mainControllers = {
  index: (req, res) => {
    db.Product.findAll().then((products) => {
      res.render("index.ejs", {
        products: products,
        tittle: "TechZone",
        css: "index.css",
      });
    });
    /* res.render("index.ejs", {
      products: products,
      tittle: "TechZone",
      css: "index.css",
    }); */
  },
};

module.exports = mainControllers;
