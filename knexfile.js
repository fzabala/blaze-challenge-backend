require('dotenv').config();

module.exports = {
    development: {
      client: 'pg',
      connection: {
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT || 5432,
      },
      migrations: {
        tableName: 'knex_migrations',
        directory: './migrations',
      },
    },
  };
  