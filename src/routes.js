const express = require('express');

const routes = express.Router();

const UsuarioController = require('./controllers/UsuarioController');
const ProdutoController = require('./controllers/ProdutoController');

routes.get('/usuarios', UsuarioController.index);
routes.post('/usuario', UsuarioController.create);

routes.get('/produtos', ProdutoController.index);
routes.post('/produto', ProdutoController.create);
routes.delete('/produto/:id', ProdutoController.delete);

module.exports = routes;