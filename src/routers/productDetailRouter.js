const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productControllers = require('../controllers/productDetailController');

const storage = multer.diskStorage({
   destination: (req, file, cb) =>{
      cb(null, path.join(__dirname, '../../public/img/products'))
   },
   filename: (req, file, cb) =>{
      const newFilename = 'image-create' + Date.now() + path.extname(file.originalname);
      cb(null, newFilename)
   }
})

const upload = multer({ storage });

router.get('/', productControllers.productList);

router.get('/create', productControllers.productCreate);

router.get('/:id', productControllers.productDetail);

router.post('/create', upload.single('image') ,productControllers.productCreatePost);

router.get('/:id/edit', productControllers.productEdit);

router.put('/:id', upload.single('image') ,productControllers.productEditPUT);

router.delete('/:id', productControllers.productDELETE);

module.exports = router;