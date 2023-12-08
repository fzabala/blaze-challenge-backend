import { Request, Response } from "express";
import { getMatchesByTeamService } from "../services";
import { logger } from "../utils";

export const getMatchesByTeam = async (req: Request, res: Response) => {
  const {teamId} = req.params;

  try {
    const matches = await getMatchesByTeamService(Number(teamId));
    
    return res.send({ data: matches });
  } catch (e) {
    logger.error(e.message, e.stack);
    return res.status(400).send({ error: e.message });
  }
};