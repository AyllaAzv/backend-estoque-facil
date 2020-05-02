exports.up = function(knex) {
    return knex.schema.createTable('produtos', function (table) {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('codigo').notNullable();
        table.string('validade').notNullable();
        table.string('dataCadastro').notNullable();
        table.integer('quantidade').notNullable();
        table.integer('quantidadeMinima').notNullable();
        table.integer('quantidadeMaxima').notNullable();
        table.decimal('valor').notNullable();
        table.string('imagem');

        table.int('usuario_id').notNullable();

        table.foreign('usuario_id').references('id').inTable('usuarios');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('produtos');
};
