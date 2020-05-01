const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query;

        const [count] = await connection('produtos').count();

        const produtos = await connection('produtos')
        .join('usuarios', 'usuarios.id', '=', 'produtos.usuario_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select(['produtos.*', 'usuarios.usuario']);

        res.header('X-Total-Count', count['count(*)']);

        return res.json(produtos);
    },

    async create(req, res) {
        const { nome, codigo, validade, dataCadastro, quantidade, quantidadeMinima, quantidadeMaxima, valor, imagem } = req.body;
        const usuario_id = req.headers.authorization;

        const [id] = await connection('produtos').insert({
            nome, 
            codigo,
            validade,
            dataCadastro,
            quantidade,
            quantidadeMinima,
            quantidadeMaxima,
            valor,
            imagem,
            usuario_id,
        });

        return res.json({ id });
    },

    async update(req, res) {
        const { id } = req.params;
        const usuario_id = req.headers.authorization;
        const { nome, codigo, validade, dataCadastro, quantidade, quantidadeMinima, quantidadeMaxima, valor, imagem } = req.body;

        const produto = await connection('produtos').where('id', id).select('usuario_id').first();

        if (produto.usuario_id != usuario_id) {
            return res.status(401).json({
                error: 'Operation not permitted.'
            });
        }

        await connection('produtos').where('id', id).update({
            nome, 
            codigo,
            validade,
            dataCadastro,
            quantidade,
            quantidadeMinima,
            quantidadeMaxima,
            valor,
            imagem,
        });

        return res.status(204).send();
    },

    async delete(req, res) {
        const { id } = req.params;
        const usuario_id = req.headers.authorization;

        const produto = await connection('produtos').where('id', id).select('usuario_id').first();

        if (produto.usuario_id != usuario_id) {
            return res.status(401).json({
                error: 'Operation not permitted.'
            });
        }

        await connection('produtos').where('id', id).delete();

        return res.status(204).send();
    }
}