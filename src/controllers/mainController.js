const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/products.json');

const mainControllers = {
    index : (req, res) =>{
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		res.render("index.ejs", {products: products});
    },
    
}

module.exports = mainControllers;