const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/products.json');

const productDetailControllers = {
    productList: (req, res) => {
        res.render('products/productDetail.ejs')
    },
    productCreate: (req, res) => {
        res.render('products/productcreate.ejs')
    },
    productDetail: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        const id = req.params.id;

        const productToSend = products.find(product => {
            return product.id == id
        })

        res.render('products/productDetail.ejs', { product: productToSend })
    },
    productCreatePost: (req, res) => {

        console.log('createPOST')
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        req.body.id = products.length + 1;

        let newProduct = req.body;
        newProduct.image = req.file.filename;

        products.push(newProduct);

        fs.writeFile(productsFilePath, JSON.stringify(products), 'utf-8', (err) => {
            if (err) {
                console.error('Error al escribir el archivo:', err);
            } else {
                console.log('Archivo sobrescrito exitosamente.');
            }
        })

        res.render('products/productDetail.ejs', { product: newProduct });

    },
    productEdit: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        const id = req.params.id;

        const productToSend = products.find(product => {
            return product.id == id
        })

        res.render('products/productEdit.ejs', { product: productToSend })
    },
    productEditPUT: (req, res) => {
        res.render('index.ejs')
    },
    productDELETE: (req, res) => {
        res.render('index.ejs')
    },
}

module.exports = productDetailControllers;