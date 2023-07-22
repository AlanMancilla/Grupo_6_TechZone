const express = require('express');
const app = express();

const path = require('path')

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/index.html'))
})



app.listen('3000', (req, res) => console.log('En linea'));