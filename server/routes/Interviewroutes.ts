import { Router } from "express";
import { requireAuth } from "../middileware/Auth";
import {
  createInterview,
  listInterviews,
  getInterview,
  finishInterview,
} from "../controller/Interviewcontroller";
import { sendMessage } from "../controller/Messagecontroller";

const router = Router();

router.use(requireAuth); // every route below requires a valid token

router.post("/", createInterview);
router.get("/", listInterviews);
router.get("/:id", getInterview);
router.patch("/:id/finish", finishInterview);
router.post("/:id/messages", sendMessage);

export default router;