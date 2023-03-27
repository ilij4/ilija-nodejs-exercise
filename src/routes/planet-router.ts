import { Router } from "express";
import planetController from "../controller/planet-controller";

const router = Router();

router.get("/", planetController.getPlanets);

export default router;
