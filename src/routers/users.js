const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');
const userControllers = require('../controllers/usersController');

const guestMiddleware = require('../middlewares/userGuestMiddleware');
const authMiddleware = require('../middlewares/userAuthMiddleware');

const storage = multer.diskStorage({
   destination: (req, file, cb) =>{
      cb(null, path.join(__dirname, '../../public/img/users'))
   },
   filename: (req, file, cb) =>{
      const newFilename = 'image-create' + Date.now() + path.extname(file.originalname);
      cb(null, newFilename)
   }
});

const upload = multer({ storage });

const validateRegister = [
   body('name').notEmpty().withMessage('Debes completar este campo con tu nombre'),
   body('last_name').notEmpty().withMessage('Debes completar este campo con tu apellido'),
   body('email').notEmpty().withMessage('Ingrese un email').bail()
   .isEmail().withMessage('Ingrese un email válido'),
   body('password').notEmpty().withMessage('ingrese una contraseña de al menos 8 caracteres').bail()
   .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
];

const validateLogin = [
   body('email').notEmpty().withMessage('Ingrese un email').bail()
   .isEmail().withMessage('Ingrese un email válido'),
   body('password').notEmpty().withMessage('ingrese una contraseña de al menos 8 caracteres').bail()
   .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
];

router.get('/', userControllers.list);

router.get('/login', guestMiddleware, userControllers.login);

router.post('/login', validateLogin, userControllers.processLogin);

router.get('/register', guestMiddleware, userControllers.register);

router.post('/register',upload.single('image'), validateRegister,  userControllers.userStore);

router.get('/profile', authMiddleware ,userControllers.profile);

router.get('/logout' ,userControllers.logout);

module.exports = router;