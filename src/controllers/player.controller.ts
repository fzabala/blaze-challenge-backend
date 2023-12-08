import { Request, Response } from "express";
import { getPlayersByTeamService } from "../services";
import { logger } from "../utils";

export const getPlayersByTeam = async (req: Request, res: Response) => {
  const {teamId} = req.params;

  try {
    const players = await getPlayersByTeamService(Number(teamId));
    
    return res.send({ data: players });
  } catch (e) {
    logger.error(e.message, e.stack);
    return res.status(400).send({ error: e.message });
  }
};