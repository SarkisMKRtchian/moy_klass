import lessonsRouter from "./lessons";
import { Router } from "express";

const router = Router();

router.use('/lessons', lessonsRouter);

export default router;