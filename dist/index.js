"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
require('dotenv').config();
var client = new discord_js_1.Client();
var BOT_SECRET = process.env.BOT_SECRET;
var prefix = '>';
var russianKidLoopChannelsIds = new Array();
var gifUrls = new Array();
client.on("ready", function () {
    console.log("Bot " + client.user.tag + " online.");
});
client.on("error", console.error);
client.on("message", function (message) {
    if (message.content === ">russiankid") {
        if (!russianKidLoopChannelsIds.includes(message.channel.id)) {
            russianKidLoopChannelsIds.push(message.channel.id);
            message.channel.send("CYKA BLYAT");
        }
    }
    russianKidLoop(message);
});
var russianKidLoop = function (message) {
    setInterval(function (cb) {
        russianKidLoopChannelsIds.forEach(function (channelId) {
            if (message.channel.id === channelId)
                message.channel.send("https://tenor.com/view/kid-meme-dancing-37-nation-gif-5514765");
        });
    }, 3600 * 1000);
};
client.login(BOT_SECRET);
