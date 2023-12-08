import { Router, RequestHandler, Express } from "express";
import { API_VERSION } from "../constants";
import * as routes from "../routes";

export interface RouteConfig {
  method:
    | "all"
    | "get"
    | "post"
    | "put"
    | "delete"
    | "patch"
    | "options"
    | "head";
  name: string;
  handlers: RequestHandler[];
}

export const addRoutes = (app: Express) => {
  const router = Router();

  for(const index in routes){
    const routeConfigs = routes[index];
    for(const routeConfigIndex in routeConfigs){
      const routeConfig = routeConfigs[routeConfigIndex];
      router[routeConfig.method.toLowerCase()](
        `${API_VERSION}${routeConfig.name}`,
        routeConfig.handlers,
      );
    }
  }
  
  router.get(`${API_VERSION}`, (req, res) => res.send({ data: "=)" }));

  app.use(router);
};