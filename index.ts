import "dotenv/config";
import express from "express";
// import userMetaRouter from "./routes/userMeta";
import { getBot } from "./utils/helpers";
import { initBot } from "./bot/initBot";
// import { createClient, RedisClientType } from "redis";
// import { PrismaClient } from "@prisma/client";

// TODO: add karma features

const {
  REDIS_URL = "",
  NODE_ENV = "development",
  PORT = "3031",
  WEBHOOK_DOMAIN_PROD = "",
  WEBHOOK_DOMAIN_DEV = "",
} = process.env;

const app = express();
const bot = getBot();

// const prisma = new PrismaClient();
const webhookDomain =
  NODE_ENV === "development" ? WEBHOOK_DOMAIN_DEV : WEBHOOK_DOMAIN_PROD;
// let redisClient: RedisClientType;

// setup redis client
/**
(async () => {
  redisClient = createClient({
    url: REDIS_URL,
  });

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
  console.log("Redis client connected");
})();
 */
// setup webhook middleware for telegram bot
(async () => {
  const webhook = await bot.createWebhook({
    domain: webhookDomain,
  });

  app.use(webhook);
  console.log("Tg-bot Webhook created!");
})();

app.use(express.json());
// app.use("/user", userMetaRouter);

initBot(bot);

app.get("/", (req, res) => {
  res.send("All Ok.");
});

app.listen(PORT, async () => {
  console.log("Server is running on port", PORT);
});

export {
  app,
  // redisClient,
  // prisma
};
