import { BOT_COMMANDS, POINTS } from "../../utils/constants";
import { Bot } from "../../utils/definitions";
import { generateReferralLink } from "../../utils/helpers";
import { prisma, redisClient } from "../../index"
import { message } from "telegraf/filters";

export const initCommand_referral = (bot: Bot) => {
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

        // Approve the join request
        await ctx.approveChatJoinRequest(joinRequest.from.id);

        // Provide points to referrer
        if (referrerStr) {
            const [_, referrerId, referrerFirstName] = referrerStr?.split('_')
            const updateUser = await prisma.user.update({
                where: {
                    telegramId: referrerId
                },
                data: {
                    points: {
                        increment: POINTS.referral,
                    },
                    referrals: {
                        push: joinRequest.from.id.toString()
                    }
                }
            })

            console.log('User updated ::', updateUser)
        }

        const newMemberJoinKey = `new_member_${joinRequest.from.id}`
        await redisClient.set(newMemberJoinKey, referrerStr, {
            'EX': 60,
        });
        // newUserPendingJoinRequests[joinRequest.from.id] = referrerStr
    });

    bot.on(message('new_chat_members'), async (ctx) => {
        const newMembers = ctx.message.new_chat_members;

        console.log('newMembers ::', newMembers)

        for (const member of newMembers) {
            const newMemberJoinKey = `new_member_${member.id}`
            const referrerStr = await redisClient.get(newMemberJoinKey)
            // const referrerStr = newUserPendingJoinRequests[member.id];
            const memberFullName = `${member.first_name}${member.last_name ? ' ' + member.last_name : ''}`
            if (referrerStr) {
                const [_, referrerId, referrerFirstName] = referrerStr?.split('_')
                const welcomeHtml = `
🎉 Welcome to the Channel <b>${memberFullName}</b>!

You have joined through <b>${referrerFirstName}</b>'s referral.`

                await ctx.replyWithHTML(welcomeHtml)
                await redisClient.del(newMemberJoinKey)
                // delete newUserPendingJoinRequests[member.id];
            }
            else {
                await ctx.replyWithHTML(`🎉 Welcome to the Channel <b>${memberFullName}</b>!`)
            }
        }

    });
}