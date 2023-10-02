const express = require('express');
const app = express();

const path = require('path')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mainRouter = require('../src/routers/mainRouter.js');
const loginRouter = require('./routers/loginRouter.js');
const regsiterRouter = require('./routers/registerRouter.js');
const productCartRouter = require('../src/routers/productCartRouter.js');
const productDetailRouter = require('../src/routers/productDetailRouter.js');

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use('/', mainRouter);
app.use('/login', loginRouter);
app.use('/register', regsiterRouter);
app.use('/productDetail', productDetailRouter);
app.use('/productCart', productCartRouter);

const port = process.env.PORT || 3000;

app.listen(port, () =>
    console.log(`Servidor corriendo en el puerto http://localhost:${port}`)
);