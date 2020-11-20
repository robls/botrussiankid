require('dotenv').config();
import { Client } from "discord.js";
import { run } from "./russianKid";
import { onInvite } from './events/onInvite';

const client: Client = new Client();
const BOT_SECRET = process.env.BOT_SECRET;

client.on("ready", () => {
    console.log(`Bot ${client.user.tag} online.`);
});

client.on("error", console.error);

client.on("message", async message => {
    await run(message);
});

client.on("inviteCreate", onInvite);

client.login(BOT_SECRET);
