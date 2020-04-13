exports.up = function(knex) {
    return knex.schema.createTable('usuarios', function (table) {
        table.increments('id').primary();
        table.string('usuario').notNullable();
        table.string('senha').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('usuarios');
};
