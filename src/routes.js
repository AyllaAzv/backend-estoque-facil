const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const UsuarioController = require('./controllers/UsuarioController');
const ProdutoController = require('./controllers/ProdutoController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

//USUARIO
routes.get('/usuarios', UsuarioController.index);

routes.post('/usuario', celebrate({
    [Segments.BODY]: Joi.object().keys({
        usuario: Joi.string().required().min(3),
        senha: Joi.string().required().min(3),
    }),
}), UsuarioController.create);

routes.delete('/usuario/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
}), UsuarioController.delete);

//PRODUTO
routes.get('/produtos', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    }),
}), ProdutoController.index);

routes.get('/produto/:codigo', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        codigo: Joi.string().required(),
    }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.number().required()
    }).unknown(),
}), ProdutoController.getByCodigo);

routes.post('/produto', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.required(),
        nome: Joi.string().required().min(3),
        codigo: Joi.string().required(),
        validade: Joi.string().required(),
        dataCadastro: Joi.string().required(),
        quantidade: Joi.number().required(),
        quantidadeMinima: Joi.number().required(),
        quantidadeMaxima: Joi.number().required(),
        valor: Joi.number().required(),
        quantidadeMinima: Joi.number().required(),
        imagem: Joi.string(),
        usuario_id: Joi.required(),
    }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.number().required(),
    }).unknown(),
}), ProdutoController.create);

routes.put('/produto/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
}), ProdutoController.update);

routes.delete('/produto/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
}), ProdutoController.delete);

//PROFILE
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.number().required()
    }).unknown(),
}), ProfileController.index);

//SESSION
routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        usuario: Joi.string().required(),
        senha: Joi.string().required(),
    }),
}), SessionController.create);

module.exports = routes;