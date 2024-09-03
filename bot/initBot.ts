import { getBot } from '../utils/helpers';
import { initCommand_start } from './commands/start';
import { BOT_COMMANDS } from '../utils/constants';
import { initCommand_me } from './commands/me';
import { initCommand_referral } from './commands/referral';
import { initCommand_leaderboard } from './commands/leaderboard';
import { Bot } from '../utils/definitions';

// const bot = getBot()

// TODO: add a leaderboard points system for referrals.

const setCommandMenu = (bot: Bot) => {
    bot.telegram.setMyCommands([
        { command: BOT_COMMANDS.me, description: 'Get all information about yourself!' },
        { command: BOT_COMMANDS.start, description: 'Start interacting with the bot' },
        { command: BOT_COMMANDS.referral, description: 'Refer to earn points!' },
        { command: BOT_COMMANDS.leaderboard, description: 'Check Top 10 of the leaderboard' },
    ]);
}


const initBot = (bot: Bot) => {

    // bot command menu
    setCommandMenu(bot);

    // init commands
    initCommand_me(bot);
    initCommand_start(bot);
    initCommand_referral(bot);
    initCommand_leaderboard(bot);

    // Start the bot
    // bot.launch();
}

export { initBot };