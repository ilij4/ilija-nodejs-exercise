import axios from "axios";
import Logger from "../config/logger";
import config from "../config/env";
import {
  ApiError,
  ApiErrorTypeEnum,
} from "../server/middlewares/error-handling-middleware";

export default abstract class SwapiService {
  private static async getAllRequest(url: string): Promise<{
    error: boolean;
    message?: string;
    data?: any;
  }> {
    try {
      let responseList: Array<any> = [];

      do {
        const response = await axios.get(url);

        url = response.data.next;
        responseList = [...responseList, ...response.data.results];
      } while (url);

      return { error: false, data: responseList };
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - sendRequest - url:${url} - ${error.message}`
      );
      return {
        error: true,
        message: error?.response?.data.message ?? error.message,
      };
    }
  }

  public static async getAllPeople(): Promise<any> {
    try {
      const { error, message, data } = await this.getAllRequest(
        `${config.swapiAddres}/people`
      );

      if (error) {
        throw new ApiError(ApiErrorTypeEnum.VALIDATION, message);
      }

      return data;
    } catch (error) {
      Logger.error(`Error in ${__filename} - getAllPeople - ${error.message}`);
      throw error;
    }
  }

  public static async getAllPlanets(): Promise<any> {
    try {
      const { error, message, data } = await this.getAllRequest(
        `${config.swapiAddres}/planets`
      );

      if (error) {
        throw new ApiError(ApiErrorTypeEnum.VALIDATION, message);
      }

      await Promise.all(
        data.map(async (planet: any) => {
          const requests = planet.residents.map((url: string) =>
            axios.get(url)
          );
          const responses = await Promise.all(requests);
          planet.residents = responses.map((response) => response.data.name);
        })
      );

      return data;
    } catch (error) {
      Logger.error(`Error in ${__filename} - getAllPeople - ${error.message}`);
      throw error;
    }
  }
}
