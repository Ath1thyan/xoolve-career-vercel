import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { bidProject, getbids, getBiddedProjects, updateStatus } from "../controllers/bid.controller.js";
 
const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, bidProject);
router.route("/get").get(isAuthenticated, getBiddedProjects);
router.route("/:id/applicants").get(isAuthenticated, getbids);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);
 

export default router;

