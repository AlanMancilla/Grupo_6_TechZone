const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/productDetailController');

router.get('/', productControllers.productDetail)

module.exports = router;