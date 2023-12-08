import { logger } from '../../utils';
import { sync } from '../../crons';
import knex from 'knex';
  
const migrationConfig = {
  directory: './migrations',
};

let knexConnection;

export const connect = () => {
  knexConnection = knex({
    client: 'sqlite3',
    connection: {
        filename: ':memory:',
    },
    useNullAsDefault: true,
  });
}

export const disconnect = async () => {
  await knexConnection.destroy();
}

export const runMigrations = async () => {
  try {
    const result = await knexConnection.migrate.latest(migrationConfig);
    console.log('Migrations executed successfully:', result);
  } catch (error) {
    console.error('Error running migrations:', error);
  }
  await sync();
}

export const revertMigrations = async () => {
  try {
    // Roll back the last batch of migrations
    const [batchNo, migrations] = await knexConnection.migrate.rollback(migrationConfig);

    if (batchNo === 0) {
      console.log('No migrations to rollback.');
    } else {
      console.log(`Rolled back batch ${batchNo} with ${migrations.length} migrations.`);
    }
  } catch (error) {
    console.error('Error rolling back migrations:', error);
  }
}

export const queryDatabase = async (sql: string, params: any[] = []) => {
  try {
    // Perform the query
    const result = await knexConnection.raw(normalizeSQL(sql), params);
    return {
      rowCount: result.length,
      rows: result,
    };
  } catch (error) {
    console.error('Error executing SQLite3 query:', error, sql, params);
    logger.error('Error executing SQLite3 query:', error, sql, params);
    throw error;
  }
};

const normalizeSQL = (sql: string) => {
  return sql.replace(/\$\d+/g, () => `?`);
}