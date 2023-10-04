const { log } = require('console');
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

        let new_id = products[products.length - 1].id + 1;
        req.body.id = new_id;

        let newProduct = req.body;
        newProduct.image = req.file.filename;

        products.push(newProduct);

        fs.writeFile(productsFilePath, JSON.stringify(products), 'utf-8', (err) => {
            if (err) {
                console.error('Error al escribir el archivo:', err);
            } else {
                console.log('Archivo sobrescrito exitosamente.');
            }
        });

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
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        const id = req.params.id

        /* const product = products.find((product) => {return product.id == id})

        let product = req.body;
        product.image = req.file.filename;
        product.name = req.body.name;
        product.price = req.body.price;
        product.description = req.body.description;
        product.category = req.body.category; */

        products[ id -1 ] = req.body;
        
        console.log(req.body)

        fs.writeFile(productsFilePath, JSON.stringify(products), 'utf-8', (err) => {
            if (err) {
                console.error('Error al escribir el archivo:', err);
            } else {
                console.log('Archivo sobrescrito exitosamente.');
            }
        })

        res.render('products/productDetail.ejs', { product: products });

    },
    productDELETE: (req, res) => {
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        const id = req.params.id;

        products = products.filter((product) => {
            return product.id != id;
        });

        fs.writeFile(productsFilePath, JSON.stringify(products), 'utf-8', (err) => {
            if (err) {
                console.error('Error al borrar:', err);
            } else {
                console.log('Archivo sobrescrito exitosamente.');
            }
        });
        res.redirect('/')
    },
}

module.exports = productDetailControllers;