import { BOT_COMMANDS } from "../../utils/constants";
import { Bot } from "../../utils/definitions";
import { prisma } from "../../index"

export const initCommand_leaderboard = (bot: Bot) => {
    bot.command(BOT_COMMANDS.leaderboard, async (ctx) => {

        const leaderboard = await prisma.user.findMany({
            take: 10,
            orderBy: {
                points: 'desc'
            },
            select: {
                firstName: true,
                username: true,
                points: true,
            }
        })

        let leaderboardText = `<b>Leaderboard</b>\n\n`;

        leaderboard.forEach((user, index) => {
            leaderboardText += `${index + 1}. ${user.firstName ? user.firstName.padEnd(15, ' ') : 'User'.padEnd(15, ' ')} ${user.points}\n`;
        });

        await ctx.replyWithHTML(`<code>${leaderboardText}</code>`);
    });
}