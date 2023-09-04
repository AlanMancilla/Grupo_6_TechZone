const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/loginController');

router.get('/', userControllers.login);

module.exports = router;