import express from "express";
import { createTrade } from "../controllers/tradeController";
import auth from "../middlewares/auth";

const router = express.Router();
router.post("/", auth, createTrade);

export default router;
