import { Request, Response } from "express";
import { getTeamsService } from "../services";
import { logger } from "../utils";

export const getTeams = async (req: Request, res: Response) => {
  try {
    const teams = await getTeamsService();
    return res.send({ data: teams });
  } catch (e) {
    logger.error(e.message, e.stack);
    return res.status(400).send({ error: e.message });
  }
};
