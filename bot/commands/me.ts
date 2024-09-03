import { Markup } from "telegraf";
import { BOT_COMMANDS } from "../../utils/constants";
import { Bot } from "../../utils/definitions";
import { prisma } from "../../index"

export
    const initCommand_me = (bot: Bot) => {
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

            const userMeta = await prisma.user.findUnique({
                select: { points: true, referrals: true },
                where: { telegramId: userId.toString() }
            })

            const userInfo = `
User Infomarion-

id: ${user.id}
First Name: ${user.first_name ?? 'NA'}
Last Name: ${user.last_name ?? 'NA'}
Username: ${user.username ?? 'NA'}
successful referrals: ${userMeta?.referrals.length ?? 0}
Points: ${userMeta?.points ?? 0}`.trim()

            await ctx.answerCbQuery(userInfo, {
                show_alert: true,
                cache_time: 10,
            });
        })
    }