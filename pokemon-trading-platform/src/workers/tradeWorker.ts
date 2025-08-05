import amqp from "amqplib";
import Trade from "../models/Trade";
import User from "../models/User";
import { logger } from "../utils/logger";
import { logNotificationAttempt } from "../services/emailService";

const processTrade = async (msg: any) => {
  const trade = JSON.parse(msg.content.toString());
  // Simulate trade validation logic
  const valid = true;
  if (valid) {
    await Trade.findByIdAndUpdate(trade._id, { status: "accepted" });
    await User.findByIdAndUpdate(trade.fromUser, { $inc: { tradesCompleted: 1 } });
    await User.findByIdAndUpdate(trade.toUser, { $inc: { tradesCompleted: 1 } });
   await logNotificationAttempt(trade.toUser, trade._id, "accepted");
  }
};

(async () => {
  const conn = await amqp.connect("amqp://localhost");
  const ch = await conn.createChannel();
  await ch.assertQueue("tradeQueue", { durable: true });
  ch.consume("tradeQueue", async msg => {
    if (msg) {
      await processTrade(msg);
      ch.ack(msg);
    }
  });
  logger.info("Trade worker running...");
})();


