import express, { Express } from "express";
import bodyParser from "body-parser";
import config from "../config/env";
import Logger from "../config/logger";
import { Server } from "http";
import router from "../routes/app-router";
import { errorHandlingMiddleware } from "./middlewares/error-handling-middleware";

export function startServer() {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get("/status", (req, res) => {
    res.json("ok");
  });
  app.use("/v1", router);

  app.use(errorHandlingMiddleware);

  const server: Server = app.listen(config.port, () => {
    Logger.info(`Server is running on port: ${config.port}`);
  });

  return server;
}

export function shutdownServer(server: Server): void {
  Logger.info(`Shuting down the server`);
  server.close(function onServerClosed(err) {
    if (err) {
      Logger.error(err);
      process.exitCode = 1;
    }
    process.exit();
  });
}
