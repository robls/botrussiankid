import { Client, Message } from "discord.js";

require('dotenv').config();
const client: Client = new Client();
const BOT_SECRET = process.env.BOT_SECRET;
const prefix = '>'
let russianKidLoopChannelsIds: string[] = new Array<string>();
let gifUrls: string[] = new Array<string>();

client.on("ready", () => {
    console.log(`Bot ${client.user.tag} online.`);
});

client.on("error", console.error);

client.on("message", message => {
    if(message.content === ">russiankid"){
        if(!russianKidLoopChannelsIds.includes(message.channel.id)){
            russianKidLoopChannelsIds.push(message.channel.id);
            message.channel.send("CYKA BLYAT");  
        }
    }
    russianKidLoop(message);
})

let russianKidLoop = (message: Message) => {
    setInterval( cb => {
        russianKidLoopChannelsIds.forEach( channelId => {
            if(message.channel.id === channelId)
                message.channel.send("https://tenor.com/view/kid-meme-dancing-37-nation-gif-5514765");
        });
    }, 3600 * 1000);
}

client.login(BOT_SECRET);