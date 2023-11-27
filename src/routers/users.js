const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { validateRegister, validateLogin } = require('../middlewares/validators');
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

router.get('/', userControllers.list);

router.get('/login', guestMiddleware, userControllers.login);

router.post('/login', validateLogin, userControllers.processLogin);

router.get('/register', guestMiddleware, userControllers.register);

router.post('/register',upload.single('image'), validateRegister,  userControllers.userStore);

router.get('/profile', authMiddleware ,userControllers.profile);

router.get('/logout' ,userControllers.logout);

module.exports = router;