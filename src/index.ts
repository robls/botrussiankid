require('dotenv').config();
import { Collection, Client, Invite, Message, TextChannel, GuildChannel } from "discord.js";
import { PREFIX } from './config';
import { RussianKid } from "./russianKid";

const client: Client = new Client();
const BOT_SECRET = process.env.BOT_SECRET;
const russianKid: RussianKid = new RussianKid();

client.on("ready", () => {
    console.log(`Bot ${client.user.tag} online.`);
});

client.on("error", console.error);

client.on("message", async (message: Message) => {
    if(message.author.bot) return undefined;

    if(!message.content.startsWith(PREFIX)) return undefined;

    await russianKid.run(message);
});

client.on("inviteCreate", (inviteCreated: Invite) => {
    let guildChannels: Collection<string, GuildChannel> = inviteCreated.guild.channels.cache;
    let textChanel: TextChannel = <TextChannel> guildChannels.find(guildChannel => guildChannel.id === '775764234658119720');

    console.log(inviteCreated);
    
    textChanel.send("CONVITE CRIADO !");
});

client.login(BOT_SECRET);