import 'dotenv/config'
import express from 'express';
import userMetaRouter from './routes/userMeta'
import { getBot } from './utils/helpers';
import { initBot } from './bot/initBot';
import { createClient, RedisClientType } from 'redis';
import { PrismaClient } from '@prisma/client';

const port = 3000;
const app = express();

const prisma = new PrismaClient()
// const bot = getBot()
// const webhookDomain = 'http://localhost:443/'
let redisClient: RedisClientType;
const REDIS_URL = process.env.REDIS_URL || '';

(async () => {
    redisClient = createClient({
        url: REDIS_URL
    });

    redisClient.on("error", (error) => console.error(`Error : ${error}`));

    await redisClient.connect();
    console.log('Redis client connected')
})();

initBot();

app.use(express.json());
// bot.createWebhook({ domain: webhookDomain })
//     .then(webhook => app.use(webhook))
//     .catch(error => console.error(error));
app.use('/user', userMetaRouter)


app.get('/', (req, res) => {
    res.send("All Ok.")
})


app.listen(port, async () => {
    console.log('Server is running on port', port);
});

export { app, redisClient, prisma };