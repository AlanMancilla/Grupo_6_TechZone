const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/products.json');

const productDetailControllers = {
    productList : (req, res) => {
        res.render('products/productDetail.ejs')
    },
    productCreate : (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		const id = 1;

		const productToSend = products.find(product => {
			return product.id == id
		})
		
		res.render('products/productDetail.ejs', {product: productToSend})
    },
    productDetail: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		const id = req.params.id;

		const productToSend = products.find(product => {
			return product.id == id
		})
		
		res.render('products/productDetail.ejs', {product: productToSend})
	},
    productCreatePost : (req, res) => {
        console.log("createPost")
        res.render('index.ejs')
    },
    productEdit : (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		const id = req.params.id;

		const productToSend = products.find(product => {
			return product.id == id
		})
		
		res.render('products/productEdit.ejs', {product: productToSend})
    },
    productEditPUT : (req, res) => {
        res.render('index.ejs')
    },
    productDELETE : (req, res) => {
        res.render('index.ejs')
    },
}

module.exports = productDetailControllers;