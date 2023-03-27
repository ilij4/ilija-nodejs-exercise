import { Router } from "express";
import peopleRouter from "./people-router";
import planetRouter from "./planet-router";

const router = Router();

router.use("/people", peopleRouter);
router.use("/planets", planetRouter);

export default router;
