exports.up = function (knex) {
    return knex.schema.createTable('teams', function (table) {
      table.string('team_key').primary();
      table.string('team_name');
      table.string('team_country');
      table.string('team_badge');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('teams');
  };