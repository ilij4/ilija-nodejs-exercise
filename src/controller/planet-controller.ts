import { Request, Response, NextFunction } from "express";
import SwapiService from "../service/swapi-service";
import Logger from "../config/logger";

class PlanetController {
  async getPlanets(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const planets = await SwapiService.getAllPlanets();

      res.json(planets);
    } catch (error) {
      Logger.error(
        `Error found in ${__filename} - getPlanets method: ${error.message}`
      );
      next(error);
    }
  }
}

const planetController = new PlanetController();
export default planetController;
