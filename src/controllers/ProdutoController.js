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

    async getByCodigo(req, res) {
        const usuario_id = req.headers.authorization;
        const { codigo } = req.params;

        const produto = await connection('produtos').where('codigo', codigo).where('usuario_id', usuario_id).select('*').first();
      
        if (!produto) {
            return res.status(400).json({ error: 'Nenhum produto encontrado com este código.' });
        }

        return res.json(produto);
    },

    async create(req, res) {
        const { nome, codigo, validade, dataCadastro, quantidade, quantidadeMinima, quantidadeMaxima, valor, imagem } = req.body;
        const usuario_id = req.headers.authorization;

        const produto = await connection('produtos').insert({
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

        return res.json(produto);
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