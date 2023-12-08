import { API_CONSTANT } from "../constants";
import { RouteConfig } from "../setup";
import { getPlayersByTeam } from "../controllers";

export const playerRouteConfig: RouteConfig[] = [
  {
    method: "get",
    name: `${API_CONSTANT.TEAMS}/:teamId/players`,
    handlers: [getPlayersByTeam],
  },
];