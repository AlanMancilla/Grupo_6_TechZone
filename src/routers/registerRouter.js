const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/registerController');

router.get('/', userControllers.register);

module.exports = router;