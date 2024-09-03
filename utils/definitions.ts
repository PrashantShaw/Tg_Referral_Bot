import { Prisma } from "@prisma/client";
import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

export type Bot = Telegraf<Context<Update>>

export type User = Prisma.$UserPayload['scalars']
