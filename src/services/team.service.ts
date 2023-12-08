import { query } from "../database";

export const getTeamsService = async () => {
  const teams = await query(`SELECT * FROM teams`);
  return teams.rows;
};