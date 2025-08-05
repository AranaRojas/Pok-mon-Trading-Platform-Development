import mongoose from "mongoose";
import { logger } from "../utils/logger";

// Esquema para registrar intentos de notificación
const notificationSchema = new mongoose.Schema({
  toUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tradeId: { type: mongoose.Schema.Types.ObjectId, ref: "Trade", required: true },
  status: { type: String, enum: ["accepted", "rejected"], required: true },
  createdAt: { type: Date, default: Date.now },
  message: { type: String }
});

const NotificationLog = mongoose.model("NotificationLog", notificationSchema);

// Función para registrar intento de notificación
export const logNotificationAttempt = async (
  toUserId: string,
  tradeId: string,
  status: "accepted" | "rejected"
) => {
  try {
    const message = `Trade ${tradeId} has been ${status}`;
    const log = new NotificationLog({ toUserId, tradeId, status, message });
    await log.save();
    logger.info(`Notificación registrada: ${message}`);
  } catch (err) {
    logger.error("Error al registrar notificación:", err);
  }
};