import Logger from "./config/logger";
import { shutdownServer, startServer } from "./server";

const server = startServer();

// quit on ctrl-c when running docker in terminal
process.on("SIGINT", function onSigint() {
  Logger.info(
    "Got SIGINT (aka ctrl-c in docker). Graceful shutdown ",
    new Date().toISOString()
  );
  shutdownServer(server);
});

// quit properly on docker stop
process.on("SIGTERM", function onSigterm() {
  Logger.info(
    "Got SIGTERM (docker container stop). Graceful shutdown ",
    new Date().toISOString()
  );
  shutdownServer(server);
});
