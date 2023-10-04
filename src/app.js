const express = require('express');
const app = express();
const methodOverride = require('method-override');
const path = require('path')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const mainRouter = require('../src/routers/mainRouter.js');
const usersRouter = require('./routers/users.js');
const productCartRouter = require('../src/routers/productCartRouter.js');
const productDetailRouter = require('../src/routers/productDetailRouter.js');

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use('/', mainRouter);
app.use('/users', usersRouter);
app.use('/productDetail', productDetailRouter);
app.use('/productCart', productCartRouter);

const port = process.env.PORT || 3000;

app.listen(port, () =>
    console.log(`Servidor corriendo en el puerto http://localhost:${port}`)
);