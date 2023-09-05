const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/productDetailController');

router.get('/', productControllers.productList);

router.get('/create', productControllers.productCreate);

router.get('/:id', productControllers.productDetail);

router.post('/', productControllers.productCreatePOST);

router.get('/:id/edit', productControllers.productEdit);

router.put('/:id', productControllers.productEditPUT);

router.delete('/:id', productControllers.productDELETE);

module.exports = router;