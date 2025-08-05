import amqp from "amqplib";
import { logger } from "../utils/logger";

export const sendTradeRequest = async (trade: any) => {
  const conn = await amqp.connect("amqp://localhost");
  const ch = await conn.createChannel();
  const q = "tradeQueue";
  await ch.assertQueue(q, { durable: true });
  ch.sendToQueue(q, Buffer.from(JSON.stringify(trade)), { persistent: true });
  logger.info("Trade request sent to queue");
};
