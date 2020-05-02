const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        const usuario_id = req.headers.authorization;

        const produtos = await connection('produtos').where('usuario_id', usuario_id).select('*');
      
        return res.json(produtos);
    }
}