import "dotenv/config";
import { Context, Telegraf } from "telegraf";
// import { prisma, redisClient } from "../index"

const {
  CHAT_ID = "",
  NODE_ENV = "development",
  TELEGRAM_BOT_TOKEN_MAIN = "",
  TELEGRAM_BOT_TOKEN_TEST = "",
} = process.env;

const TELEGRAM_BOT_TOKEN =
  NODE_ENV === "development"
    ? TELEGRAM_BOT_TOKEN_TEST
    : TELEGRAM_BOT_TOKEN_MAIN;

export const getBot = () => {
  // Initialize the bot with your bot token
  const bot = new Telegraf(TELEGRAM_BOT_TOKEN);
  return bot;
};
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
  LTC: 180,
};

export type Coin = keyof typeof prices;

export const coins = Object.keys(prices);

export const fetchCryptoPrice = async (symbol: Coin) => {
  return prices[symbol] || "Unknown";
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
/**
export async function generateReferralLink(ctx: Context): Promise<string> {
    const referrer = ctx.from
    const referralLinkKey = `referral_link_${referrer?.id}`
    // await redisClient.del(referralLinkKey)
    const prevInviteLink = await redisClient.get(referralLinkKey)
    // const prevInviteLink = userReferralLinks[referrer?.id!]

    if (prevInviteLink) {
        return prevInviteLink;
    }

    // add the member to db if does not exist
    const newUser = await prisma.user.upsert({
        where: {
            telegramId: referrer?.id.toString()!,
        },
        create: {
            telegramId: referrer?.id.toString()!,
            firstName: referrer?.first_name,
            lastName: referrer?.last_name,
            username: referrer?.username,
        },
        update: {}
    })

    console.log('Created new user: ', newUser)

    const referrerStr = `Referrer_${referrer?.id}_${referrer?.first_name}`
    const chatInviteLink = await ctx.telegram.createChatInviteLink(CHAT_ID, {
        name: referrerStr,
        creates_join_request: true // This ensures we get chat_join_request updates
    });
    const inviteLink = chatInviteLink.invite_link;
    // const link = await ctx.exportChatInviteLink();
    await redisClient.set(referralLinkKey, inviteLink, {
        'EX': 604800 // expire after 7 days (in seconds)
    })
    // userReferralLinks[referrer?.id!] = inviteLink;
    // console.log('userReferralLinks ::', userReferralLinks)

    return inviteLink;
}
 */
