exports.up = function (knex) {
    return knex.schema.createTable('players', function (table) {
        table.string('player_key').primary();
        table.string('player_id');
        table.string('player_image');
        table.string('player_name');
        table.string('player_number');
        table.string('player_country');
        table.string('player_type');
        table.string('player_age');
        table.date('player_birthdate');
        table.string('team_key').references('team_key').inTable('teams');
    });
  };
  
  exports.down = function (knex) {
        return knex.schema.dropTable('players');
  };