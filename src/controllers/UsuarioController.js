const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        const usuarios = await connection('usuarios').select('*');

        return res.json(usuarios);
    },

    async create(req, res) {
        const { usuario, senha } = req.body;

        const [id] = await connection('usuarios').insert({
            usuario,
            senha,
        });

        return res.json({ id });
    },

    async delete(req, res) {
        const { id } = req.params;

        await connection('usuarios').where('id', id).delete();

        return res.status(204).send();
    }
}