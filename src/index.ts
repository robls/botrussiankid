require('dotenv').config();
import { Client, GuildMember, Message } from "discord.js";
import { PREFIX } from './config';
import { RussianKid } from "./russianKid";
import { onInvite } from './events/onInvite';
import { type } from "os";

const client: Client = new Client();
const BOT_SECRET = process.env.BOT_SECRET;
const russianKid: RussianKid = new RussianKid();

client.on("ready", () => {
    console.log(`Bot ${client.user.tag} online.`);
});

client.on("error", console.error);

client.on("message", russianKid.run);

client.on("inviteCreate", onInvite);

client.login(BOT_SECRET);