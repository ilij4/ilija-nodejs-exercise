import { Request, Response, NextFunction } from "express";
import { PeopleSort } from "./utils";
import {
  ApiError,
  ApiErrorTypeEnum,
} from "../server/middlewares/error-handling-middleware";
import SwapiService from "../service/swapi-service";
import Logger from "../config/logger";

class PeopleController {
  async getPeople(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      let { sortBy } = req.query;
      if (
        sortBy &&
        Object.values(PeopleSort).indexOf(sortBy as PeopleSort) === -1
      ) {
        throw new ApiError(
          ApiErrorTypeEnum.VALIDATION,
          `Sort by ${sortBy} is not supported`
        );
      }

      const sortByField: PeopleSort = sortBy as PeopleSort;

      const people = await SwapiService.getAllPeople();

      if (sortByField) {
        people.sort((a: any, b: any) => {
          if (!isNaN(a[sortByField])) {
            return a[sortByField] - b[sortByField];
          }
          return a[sortByField].localeCompare(b[sortByField]);
        });
      }

      res.json(people);
    } catch (error) {
      Logger.error(
        `Error found in ${__filename} - getPeople method: ${error.message}`
      );
      next(error);
    }
  }
}

const peopleController = new PeopleController();
export default peopleController;
