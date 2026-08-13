import { Router } from "express";
import { requireAuth } from "../middileware/Auth";
import { getStats } from "../controller/Dashboardcontroller";

const router = Router();

router.get("/stats", requireAuth, getStats);

export default router;