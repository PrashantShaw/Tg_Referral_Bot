import 'dotenv/config'
import { Context, Markup } from 'telegraf';
import { message } from 'telegraf/filters';
import { Coin, coins, fetchCryptoPrice, getBot } from '../utils/helpers';

const MINI_APP_DEPLOYMENT_URL = process.env.MINI_APP_DEPLOYMENT_URL || ''
const CHAT_ID = process.env.CHAT_ID || ''
const VALIDIUM_NETWORK_URL = 'https://www.validium.network/'
const VALIDIUM_BLOG_URL = 'https://medium.com/@validium'
const VALIDIUM_DOCS_URL = 'https://www.validium.network/developers/docs'
const VALIDIUM_WHITE_PAPER_URL = 'https://docsend.com/view/5c85m6dfy3v4rren'

const bot = getBot()

// TODO: In-memory storage for referral links (in production, use a database)
// TODO: add a leaderboard points system for referrals.
// TODO: refactor this file

const userReferralLinks: Record<number, string> = {};
const newUserPendingJoinRequests: Record<number, string> = {};

async function generateReferralLink(ctx: Context): Promise<string> {
    const referrer = ctx.from
    const prevInviteLink = userReferralLinks[referrer?.id!]

    if (prevInviteLink) {
        return prevInviteLink;
    }

    const referrerStr = `Referrer_${referrer?.id}_${referrer?.first_name}`
    const chatInviteLink = await ctx.telegram.createChatInviteLink(CHAT_ID, {
        name: referrerStr,
        creates_join_request: true // This ensures we get chat_join_request updates
    });
    const inviteLink = chatInviteLink.invite_link;
    // const link = await ctx.exportChatInviteLink();
    userReferralLinks[referrer?.id!] = inviteLink;
    console.log('userReferralLinks ::', userReferralLinks)

    return inviteLink;
}

export const BOT_COMMANDS = {
    me: 'me',
    start: 'start',
    referral: 'referral',
    greet: 'greet',
}

const setCommandMenu = () => {
    bot.telegram.setMyCommands([
        { command: BOT_COMMANDS.me, description: 'Get all information about yourself!' },
        { command: BOT_COMMANDS.start, description: 'Start interacting with the bot' },
        { command: BOT_COMMANDS.referral, description: 'Refer to earn points!' },
        { command: BOT_COMMANDS.greet, description: 'Create a warm greeting' },
    ]);
}

const initCommand_start = () => {
    // Handle the /start command
    bot.start((ctx) => {
        console.log('FROM ::', ctx.from)
        console.log('TEXT ::', ctx.message.text)
        console.log('ARGS ::', ctx.args)

        const imageSource = './images/hk_banner.png'
        const imageCaption = `
<b>🎉 Hello ${ctx.from.first_name}</b>
<b>Welcome to the Group!</b>

Use the buttons below to get started or interact with the bot 🤖 from the <code>/</code> command menu.`.trim();

        ctx.replyWithPhoto({
            source: imageSource
        }, {
            caption: imageCaption,
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Validium Network 🌐', url: VALIDIUM_NETWORK_URL }],
                    [{ text: 'Documentations 💻', url: VALIDIUM_DOCS_URL }],
                    [{ text: 'Blogs 📝', url: VALIDIUM_BLOG_URL }],
                    [{ text: 'White Paper 📄', url: VALIDIUM_WHITE_PAPER_URL }],
                    // 'Bad Request: web App buttons can be used in private chats only'
                    // [{ text: 'Games 🐹', web_app: { url: MINI_APP_DEPLOYMENT_URL } }],
                    [{ text: 'Crypto Prices 💰', callback_data: 'get_crypto_prices' }],
                ]
            }
        })
    });


    // --- actions ---
    bot.action('get_crypto_prices', (ctx) => {
        const coinButtons = coins.map(coin => Markup.button.callback(coin, `get_price_${coin}`));

        const buttonsGrid = []
        const buttonsPerRow = 2
        for (let index = 0; index < coinButtons.length; index += buttonsPerRow) {
            const thisRow = coinButtons.slice(index, index + buttonsPerRow)
            buttonsGrid.push(thisRow)
        }
        const inlineKeyboardButtons = Markup.inlineKeyboard(buttonsGrid)

        ctx.reply('Select a cryptocurrency to get its current price:', inlineKeyboardButtons);
    })

    bot.action(/get_price_(.+)/, async (ctx) => {
        const symbol = ctx.match[1] as Coin;
        const price = await fetchCryptoPrice(symbol);

        ctx.reply(`The current price of ${symbol} is $${price}.`);
    });
}

const initCommand_me = () => {
    bot.command(BOT_COMMANDS.me, (ctx) => {
        // const user = ctx.from;
        const inlineKeyboardButton = Markup.inlineKeyboard([
            Markup.button.callback('View ', `view_user_${ctx.from.id}`)
        ]);
        ctx.replyWithHTML(`
<b>Hey ${ctx.from.first_name},</b>
Its a hidden message 🔇
Click the button below to view them secretly.
            `,
            inlineKeyboardButton
        );
    });

    bot.action(/view_user_(.+)/, async ctx => {
        const userId = Number(ctx.match[1])
        const user = ctx.from

        if (user.id !== userId) {
            const incorrectUserAlertText = `
This message is not for you.

If you want to get your user infomation then please use the /me command from the menu.`

            await ctx.answerCbQuery(incorrectUserAlertText, {
                show_alert: true,
                cache_time: 5,
            });
            return;
        }

        const userInfo = `
User Infomarion-

id: ${user.id}
First Name: ${user.first_name ?? 'NA'}
Last Name: ${user.last_name ?? 'NA'}
Username: ${user.username ?? 'NA'}
Points: 0`.trim()

        await ctx.answerCbQuery(userInfo, {
            show_alert: true,
            cache_time: 10,
        });
    })
}

const initCommand_greet = () => {
    bot.command(BOT_COMMANDS.greet, (ctx) => {
        const user = ctx.from;
        const greetText = `🎉 Welcome to the Group! <b>${user.first_name}</b>`
        ctx.replyWithHTML(greetText)
    });
}

const initCommand_referral = () => {
    bot.command(BOT_COMMANDS.referral, async (ctx) => {
        console.log('Referrer ::', ctx.from)
        const referralLink = await generateReferralLink(ctx);
        // ctx.reply(`Hey ${ctx.from.first_name}, Here's your referral link: ${referralLink}`);
        ctx.replyWithHTML(`
<b>Hey there,</b>
<b>It's ${ctx.from.first_name} ${ctx.from.last_name ?? ''}</b>

🚀 Please use my referral link below to join the group!
${referralLink}
            `, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Join', url: referralLink }]
                ]
            }
        })
    });

    // --- listeners ---
    bot.on('chat_join_request', async (ctx) => {
        console.log('inside chat_join_request')
        const joinRequest = ctx.chatJoinRequest;
        const referrerStr = joinRequest.invite_link?.name!

        newUserPendingJoinRequests[joinRequest.from.id] = referrerStr
        await ctx.approveChatJoinRequest(joinRequest.from.id);
    });

    bot.on(message('new_chat_members'), async (ctx) => {
        const newMembers = ctx.message.new_chat_members;

        console.log('newMembers ::', newMembers)

        for (const member of newMembers) {
            const referrerStr = newUserPendingJoinRequests[member.id];
            const memberFullName = `${member.first_name}${member.last_name ? ' ' + member.last_name : ''}`
            if (referrerStr) {
                const [_, referrerId, referrerFirstName] = referrerStr?.split('_')
                const welcomeHtml = `
🎉 Welcome to the Channel <b>${memberFullName}</b>!

You have joined through <b>${referrerFirstName}</b>'s referral.`

                await ctx.replyWithHTML(welcomeHtml)
                delete newUserPendingJoinRequests[member.id];
            }
            else {
                await ctx.replyWithHTML(`🎉 Welcome to the Channel <b>${memberFullName}</b>!`)
            }
        }

    });
}

const initBot = () => {

    // bot command menu
    setCommandMenu();

    // init commands
    initCommand_me();
    initCommand_start();
    initCommand_referral();
    initCommand_greet();

    // Start the bot
    bot.launch();
}

export { initBot };