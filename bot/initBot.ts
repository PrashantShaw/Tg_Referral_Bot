// import { initCommand_start } from "./commands/start";
import { BOT_COMMANDS } from "../utils/constants";
// import { initCommand_me } from "./commands/me";
// import { initCommand_referral } from "./commands/referral";
// import { initCommand_leaderboard } from "./commands/leaderboard";
import { Bot } from "../utils/definitions";
import { initCommandsForAllLinks } from "./commands/allLinks";

const setCommandMenu = (bot: Bot) => {
  /** 
  bot.telegram.setMyCommands([
    {
      command: BOT_COMMANDS.me,
      description: "Get all information about yourself!",
    },
    {
      command: BOT_COMMANDS.start,
      description: "Start interacting with the bot",
    },
    { command: BOT_COMMANDS.referral, description: "Refer to earn points!" },
    {
      command: BOT_COMMANDS.leaderboard,
      description: "Check Top 10 of the leaderboard",
    },
  ]);
  */
  bot.telegram.setMyCommands([
    {
      command: BOT_COMMANDS.network,
      description: "Get all information about Validium Network!",
    },
    {
      command: BOT_COMMANDS.connect_to_validium,
      description: "Add Validium Network",
    },
    {
      command: BOT_COMMANDS.faucet,
      description: "Get Free VLDM tokens every day!",
    },
    {
      command: BOT_COMMANDS.developers,
      description: "Checkout all our developers features.",
    },
    {
      command: BOT_COMMANDS.documentations,
      description: "Learn how to use Validum to solve real world problems",
    },
    {
      command: BOT_COMMANDS.blog,
      description: "Understand concepts about Validum through articles.",
    },
    {
      command: BOT_COMMANDS.whitepaper,
      description: "Read complete Validum whitepaper.",
    },

    {
      command: BOT_COMMANDS.tweeter,
      description: "Our X · tweeter handle",
    },
    {
      command: BOT_COMMANDS.linkedin,
      description: "Our LinkedIn Page",
    },
    {
      command: BOT_COMMANDS.youtube,
      description: "Our Youtube Channel",
    },
    {
      command: BOT_COMMANDS.pitch_deck,
      description: "See our Pitch Deck",
    },
  ]);
};

const initBot = (bot: Bot) => {
  // bot command menu
  setCommandMenu(bot);

  // init commands
  /**
    initCommand_start(bot);
    initCommand_me(bot);
    initCommand_referral(bot);
    initCommand_leaderboard(bot);
    */

  initCommandsForAllLinks(bot);

  // Start the bot (use this for polling)
  // bot.launch();
};

export { initBot };
