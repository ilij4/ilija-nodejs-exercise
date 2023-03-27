import * as dotenv from "dotenv";

dotenv.config();

interface IEnvironmentConfig {
  port: string | number;
  swapiAddres: string;
}

const config: IEnvironmentConfig = {
  port: process.env.PORT || 3000,
  swapiAddres: process.env.SWAPI_ADDRESS || "https://swapi.dev/api",
};

export default config;
