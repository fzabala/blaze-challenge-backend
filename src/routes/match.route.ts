import { API_CONSTANT } from "../constants";
import { RouteConfig } from "../setup";
import { getMatchesByTeam } from "../controllers";

export const matchesRouteConfig: RouteConfig[] = [
  {
    method: "get",
    name: `${API_CONSTANT.TEAMS}/:teamId/matches`,
    handlers: [getMatchesByTeam],
  },
];