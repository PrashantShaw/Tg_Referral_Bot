import { Markup } from "telegraf";
import { Bot } from "../../utils/definitions";
import { Coin, coins, fetchCryptoPrice } from "../../utils/helpers";
import { VALIDIUM_LINKS } from "../../utils/constants";

export const initCommand_start = (bot: Bot) => {
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
                    [{ text: 'Validium Network 🌐', url: VALIDIUM_LINKS.network }],
                    [{ text: 'Documentations 💻', url: VALIDIUM_LINKS.documentations }],
                    [{ text: 'Blogs 📝', url: VALIDIUM_LINKS.blog }],
                    [{ text: 'White Paper 📄', url: VALIDIUM_LINKS.whitePaper }],
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