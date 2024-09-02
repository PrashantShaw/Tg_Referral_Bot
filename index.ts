import 'dotenv/config'
import express from 'express';
import userMetaRouter from './routes/userMeta'
import { getBot } from './utils/helpers';
import { initBot } from './bot/initBot';

const port = 3000;
const app = express();
const bot = getBot()
// const webhookDomain = 'http://localhost:443/'
initBot();

app.use(express.json());
// bot.createWebhook({ domain: webhookDomain })
//     .then(webhook => app.use(webhook))
//     .catch(error => console.error(error));
app.use('/user', userMetaRouter)


app.get('/', (req, res) => {
    res.send("All Ok.")
})

app.listen(port, () => {
    console.log('Server is running on port', port);
});

export default app;