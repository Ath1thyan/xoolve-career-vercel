import express from "express";
import { getMessage, sendMessage, getOldUsers } from "../controllers/message.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/send/:id").post(isAuthenticated,sendMessage);
router.route("/:id").get(isAuthenticated, getMessage);
router.route("/conversations/getoldusers").get(isAuthenticated, getOldUsers);

export default router;