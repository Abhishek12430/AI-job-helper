//server/routes/jobRoutes
import express from "express";
import { generateRoadmap } from "../controllers/jobController.js";
const router = express.Router();

router.post("/roadmap", generateRoadmap);

export default router;
