const db = require("../database/models");

const mainControllers = {
  index: (req, res) => {
    db.Product.findAll().then((products) => {
      res.render("index.ejs", {
        products: products
      });
    });
  },
};

module.exports = mainControllers;
