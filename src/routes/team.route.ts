import { API_CONSTANT } from "../constants";
import { RouteConfig } from "../setup";
import { getTeams } from "../controllers";

export const teamRouteConfig: RouteConfig[] = [
  {
    method: "get",
    name: `${API_CONSTANT.TEAMS}`,
    handlers: [getTeams],
  },
];