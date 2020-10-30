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
    }
})

client.login(BOT_SECRET);