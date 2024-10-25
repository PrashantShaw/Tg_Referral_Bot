import {
  BOT_COMMANDS,
  COMMAND_BANNERS,
  VALIDIUM_LINKS,
} from "../../utils/constants";
import { Bot } from "../../utils/definitions";

export const initCommandsForAllLinks = (bot: Bot) => {
  bot.command(BOT_COMMANDS.network, async (ctx) => {
    const imageSource = COMMAND_BANNERS.network;
    const imageCaption = `
<b>👋 Hello ${ctx.from.first_name}</b>
<b>Thanks for using me!</b>

🔗 Scaling the Future with Blazing Speed, Ironclad Security, and Infinite Scalability:
<a href="${VALIDIUM_LINKS.network}">${VALIDIUM_LINKS.network}</a>

Let’s build the future together!`.trim();

    ctx.replyWithPhoto(
      {
        source: imageSource,
      },
      {
        caption: imageCaption,
        parse_mode: "HTML",
      }
    );
  });
  bot.command(BOT_COMMANDS.connect_to_validium, async (ctx) => {
    const imageSource = COMMAND_BANNERS.connectValidium;
    const imageCaption = `
<b>👋 Hello ${ctx.from.first_name}</b>
<b>Thanks for using me!</b>

🔗 Step-by-step guide to connect your wallet to Validium devnet:
<a href="${VALIDIUM_LINKS.connectValidium}">${VALIDIUM_LINKS.connectValidium}</a>

Let’s build the future together!`.trim();

    ctx.replyWithPhoto(
      {
        source: imageSource,
      },
      {
        caption: imageCaption,
        parse_mode: "HTML",
      }
    );
  });
  bot.command(BOT_COMMANDS.faucet, async (ctx) => {
    const imageSource = COMMAND_BANNERS.faucet;
    const imageCaption = `
<b>👋 Hello ${ctx.from.first_name}</b>
<b>Thanks for using me!</b>

🔗 Use our faucet to get Free VLDM tokens every day:
<a href="${VALIDIUM_LINKS.faucet}">${VALIDIUM_LINKS.faucet}</a>

Let’s build the future together!`.trim();

    ctx.replyWithPhoto(
      {
        source: imageSource,
      },
      {
        caption: imageCaption,
        parse_mode: "HTML",
      }
    );
  });
  bot.command(BOT_COMMANDS.developers, async (ctx) => {
    const imageSource = COMMAND_BANNERS.developers;
    const imageCaption = `
<b>👋 Hello ${ctx.from.first_name}</b>
<b>Thanks for using me!</b>

🔗 Enables developers to build and deploy decentralized applications:
<a href="${VALIDIUM_LINKS.developers}">${VALIDIUM_LINKS.developers}</a>

Let’s build the future together!`.trim();

    ctx.replyWithPhoto(
      {
        source: imageSource,
      },
      {
        caption: imageCaption,
        parse_mode: "HTML",
      }
    );
  });
  bot.command(BOT_COMMANDS.documentations, async (ctx) => {
    const imageSource = COMMAND_BANNERS.documentations;
    const imageCaption = `
<b>👋 Hello ${ctx.from.first_name}</b>
<b>Thanks for using me!</b>

🔗 Dive into our documentation to learn more about Validium and how to get started with the network:
<a href="${VALIDIUM_LINKS.documentations}">${VALIDIUM_LINKS.documentations}</a>

Let’s build the future together!`.trim();

    ctx.replyWithPhoto(
      {
        source: imageSource,
      },
      {
        caption: imageCaption,
        parse_mode: "HTML",
      }
    );
  });
  bot.command(BOT_COMMANDS.blog, async (ctx) => {
    const imageSource = COMMAND_BANNERS.blog;
    const imageCaption = `
<b>👋 Hello ${ctx.from.first_name}</b>
<b>Thanks for using me!</b>

🔗 Understand concepts about Validum through articles:
<a href="${VALIDIUM_LINKS.blog}">${VALIDIUM_LINKS.blog}</a>

Let’s build the future together!`.trim();

    ctx.replyWithPhoto(
      {
        source: imageSource,
      },
      {
        caption: imageCaption,
        parse_mode: "HTML",
      }
    );
  });
  bot.command(BOT_COMMANDS.whitepaper, async (ctx) => {
    const imageSource = COMMAND_BANNERS.whitePaper;
    const imageCaption = `
<b>👋 Hello ${ctx.from.first_name}</b>
<b>Thanks for using me!</b>

🔗 Dive into our documentation to learn more about Validium and how to get started with the network:
<a href="${VALIDIUM_LINKS.whitePaper}">${VALIDIUM_LINKS.whitePaper}</a>

Let’s build the future together!`.trim();

    ctx.replyWithPhoto(
      {
        source: imageSource,
      },
      {
        caption: imageCaption,
        parse_mode: "HTML",
      }
    );
  });
};
