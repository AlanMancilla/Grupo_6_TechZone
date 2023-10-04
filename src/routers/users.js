const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userControllers = require('../controllers/usersController');

const validateCreateForm = [
   body('name').notEmpty().withMessage('Debes completar este campo con tu nombre'),
   body('last_name').notEmpty().withMessage('Debes completar este campo con tu apellido'),
   body('email').notEmpty().withMessage('Ingrese un email').bail()
   .isEmail().withMessage('Ingrese un email válido'),
   body('password').notEmpty().withMessage('ingrese una contraseña de al menos 8 caracteres').bail()
   .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
];

router.get('/login', userControllers.login);

router.get('/register', userControllers.register);
router.post('/register', validateCreateForm, userControllers.userStore);


module.exports = router;