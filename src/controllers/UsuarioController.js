const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        const usuarios = await connection('usuarios').select('*');

        return res.json(usuarios);
    },

    async create(req, res) {
        const { usuario, senha } = req.body;

        await connection('usuarios').insert({
            usuario,
            senha,
        });

        return res.json({ id });
    }
}