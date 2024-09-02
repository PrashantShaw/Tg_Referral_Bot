import 'dotenv/config'
import { Context, Telegraf } from "telegraf";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || ''
const CHAT_ID = process.env.CHAT_ID || ''

export const getBot = () => {
    // Initialize the bot with your bot token
    const bot = new Telegraf(TELEGRAM_BOT_TOKEN);
    return bot;
}
const prices = {
    BTC: 50000,
    ETH: 3000,
    BNB: 400,
    XRP: 1,
    ADA: 2,
    SOL: 150,
    DOGE: 0.2,
    DOT: 35,
    AVAX: 100,
    LTC: 180
};

export type Coin = keyof typeof prices

export const coins = Object.keys(prices)

export const fetchCryptoPrice = async (symbol: Coin) => {
    return prices[symbol] || 'Unknown';
};

async function getUserInfo(ctx: Context, userId: number) {
    try {
        const chatMember = await ctx.telegram.getChatMember(CHAT_ID, userId);
        return chatMember.user;
    } catch (error) {
        console.error(`Error fetching user info for ID ${userId}:`, error);
        return null;
    }
}