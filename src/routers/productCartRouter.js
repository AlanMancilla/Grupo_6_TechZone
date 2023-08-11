const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/productCartController');

router.get('/', productControllers.productCart);

module.exports = router;