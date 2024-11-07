import lessonsController from "../controllers/lessons.controller";
import { Router } from "express";

const lessonsRouter = Router();

lessonsRouter.get('/', lessonsController.getLessons);

export default lessonsRouter;