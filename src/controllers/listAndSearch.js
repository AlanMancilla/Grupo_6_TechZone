const express = require('express');
const { sequelize, Producto } = require('./config');

const app = express();

// Listar todos los productos
app.get('/productos', async (req, res) => {
  const productos = await Producto.findAll();
  res.json(productos);
});

// Buscar un producto por ID
app.get('/productos/:id', async (req, res) => {
  const { id } = req.params;
  const producto = await Producto.findByPk(id);

  if (producto) {
    res.json(producto);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

sequelize.sync() // Esto sincroniza tus modelos con la base de datos
  .then(() => {
    app.listen(3000, () => {
      console.log('Servidor en ejecución en el puerto 3000');
    });
  });
