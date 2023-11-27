const { body } = require('express-validator');
const path = require('path');
const db = require('../database/models')

const validateRegister = [
   body('name').notEmpty().withMessage('Debes completar este campo con tu nombre.').bail()
   .isLength({min: 2}).withMessage('Deberá tener al menos 2 caracteres.'),

   body('last_name').notEmpty().withMessage('Debes completar este campo con tu apellido').bail()
   .isLength({min: 2}).withMessage('Deberá tener al menos 2 caracteres.'),

   body('email').notEmpty().withMessage('Ingrese un email').bail()
   .isEmail().withMessage('Ingrese un email válido(ej: usuario@email.com)')
   .custom(async value => {
      const user = await db.User.findOne({
         where: {
           email: value,
         },
       });
      if (user) {
        throw new Error('Ya hay una cuenta creada con este usuario');
      }
    }),

   body('password').notEmpty().withMessage('ingrese una contraseña de al menos 8 caracteres').bail()
   .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
   .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).*$/, 'i').withMessage('La contraseña debe tener por lo menos una mayuscula, una minuscula, un numero y un caracter especial(ej: !, @, #, $, %)'),

   body('check_password').notEmpty().withMessage('La contraseña no coincide').bail()
   .custom((value, { req }) => {
      if(!(value === req.body.password)) {
         throw new Error ('La contraseña no coincide');
      }
      return true;
      }),

   body('image')
         .custom((value, {req}) => {
               let file = req.file;
               // Si no vino un archivo
               if (!file) {
                  throw new Error ('Debes subir una imagen para su perfil');
               // Si vino un archivo
               } else {
                  let fileExtension = path.extname(file.originalname);
                  let acceptedExtensions = ['.jpeg', '.jpg', '.gif', '.png', '.JPEG', '.JPG', '.GIF', '.PNG'];
                  // Si no es una extensión válida
                  if (!acceptedExtensions.includes(fileExtension)) {
                     throw new Error ('Las extensiones de archivo permitidas son ' + acceptedExtensions.join(', '))
                  }
               }
               // Si no hubo ningun error, devolver true para demostrar que está todo en orden 
               return true;
         })
];

const validateLogin = [
   body('email').notEmpty().withMessage('Ingrese un email').bail()
   .isEmail().withMessage('Ingrese un email válido'),

   body('password').notEmpty().withMessage('ingrese una contraseña de al menos 8 caracteres').bail()
   .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
];

const validateProduct = [
   body('name').notEmpty().withMessage('Debes completar este campo con el nombre del producto.').bail()
   .isLength({min: 2}).withMessage('El nombre deberá tener al menos 5 caracteres.'),

   body('description').notEmpty().withMessage('Debes completar este campo con una descripción del producto.').bail()
   .isLength({min: 20}).withMessage('Deberá tener al menos 20 caracteres.'),

   body('price').notEmpty().withMessage('Debes completar este campo con el precio del producto').bail()
   .isLength({min: 3}).withMessage('Deberá tener un precio minimo de 100'),

   body('image')
         .custom((value, {req}) => {
               let file = req.file;
               // Si no vino un archivo
               if (!file) {
                  throw new Error ('Debes subir una imagen de producto');
               // Si vino un archivo
               } else {
                  let fileExtension = path.extname(file.originalname);
                  let acceptedExtensions = ['.jpeg', '.jpg', '.gif', '.png', '.JPEG', '.JPG', '.GIF', '.PNG'];
                  // Si no es una extensión válida
                  if (!acceptedExtensions.includes(fileExtension)) {
                     throw new Error ('Las extensiones de archivo permitidas son ' + acceptedExtensions.join(', '))
                  }
               }
               // Si no hubo ningun error, devolver true para demostrar que está todo en orden 
               return true;
         })
]

module.exports = {
   validateRegister,
   validateLogin,
   validateProduct
}