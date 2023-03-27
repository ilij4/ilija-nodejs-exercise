import { Router } from "express";
import peopleController from "../controller/people-controller";

const router = Router();

router.get("/", peopleController.getPeople);

export default router;
