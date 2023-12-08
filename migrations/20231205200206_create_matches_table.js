exports.up = function (knex) {
    return knex.schema.createTable('matches', function (table) {
        table.string('match_id').primary();
        table.string('country_id');
        table.string('country_name');
        table.string('league_id');
        table.string('league_name');
        table.date('match_date');
        table.string('match_status');
        table.string('match_time');
        table.string('match_hometeam_id');
        table.string('match_hometeam_name');
        table.string('match_hometeam_score');
        table.string('match_awayteam_name');
        table.string('match_awayteam_id');
        table.string('match_awayteam_score');
    });
  };
  
exports.down = function (knex) {
    return knex.schema.dropTable('matches');
};