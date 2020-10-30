require('dotenv').config();
const {Client} = require('discord.js');
const client = new Client();
const BOT_SECRET = process.env.BOT_SECRET;
const prefix = '!'

client.on("ready", () => {
    console.log(`Bot ${client.user.tag} online.`);
});

client.on("error", console.error);

client.on("message", async message => {
    if(message.content === "!russiankid"){
        setInterval( interval => {
            message
                .channel
                    .send("https://tenor.com/view/kid-meme-dancing-37-nation-gif-5514765");
        }, 10 * 100000);
    }
})

client.login(BOT_SECRET);