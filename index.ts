import 'dotenv/config'
import express from 'express';
import userMetaRouter from './routes/userMeta'
import { getBot } from './utils/helpers';
import { initBot } from './bot/initBot';
import { createClient, RedisClientType } from 'redis';
import { PrismaClient } from '@prisma/client';

const port = process.env.PORT || 3000;
const app = express();
const bot = getBot();

const prisma = new PrismaClient();
const webhookDomain = 'https://tg-referral-bot.onrender.com/webhook';
const REDIS_URL = process.env.REDIS_URL || '';
let redisClient: RedisClientType;

(async () => {
    redisClient = createClient({
        url: REDIS_URL
    });

    redisClient.on("error", (error) => console.error(`Error : ${error}`));

    await redisClient.connect();
    console.log('Redis client connected')
})();

(async () => {
    const webhook = await bot.createWebhook({
        domain: webhookDomain
    });

    app.use(webhook);
    console.log('Tg-bot Webhook created!');
})()

app.use(express.json());
// bot.createWebhook({ domain: webhookDomain })
//     .then(webhook => {
//         app.use(webhook)
//         console.log('Tg-bot Webhook created!')
//     })
//     .catch(error => console.error(error));
app.use('/user', userMetaRouter)

initBot(bot);

app.get('/', (req, res) => {
    res.send("All Ok.")
})


app.listen(port, async () => {
    console.log('Server is running on port', port);
});

export { app, redisClient, prisma };