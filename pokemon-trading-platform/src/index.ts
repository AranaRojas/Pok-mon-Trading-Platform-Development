import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createClient } from "redis";
import authRoutes from "./routes/authRoutes";
import tradeRoutes from "./routes/tradeRoutes";
import rateLimiter from "./middlewares/rateLimiter";
import { logger } from "./utils/logger";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(rateLimiter);
app.use("/api/auth", authRoutes);
app.use("/api/trades", tradeRoutes);

mongoose.connect(process.env.MONGO_URI || "", {})
  .then(() => logger.info("MongoDB connected"))
  .catch(err => logger.error("MongoDB connection error:", err));

const redisClient = createClient();
redisClient.connect().then(() => logger.info("Redis connected"));

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
