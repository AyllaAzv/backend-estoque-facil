const connection = require('../database/connection');

module.exports = {
    async create(req, res) {
        const { usuario, senha } = req.body;

        const user = await connection('usuarios').where('usuario', usuario).where('senha', senha).select('*').first();
      
        if (!user) {
            return res.status(400).json({ error: 'No USER found with this user and senha.' });
        }

        return res.json(user);
    }
}