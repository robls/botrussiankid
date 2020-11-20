import { Message, VoiceChannel, VoiceConnection } from 'discord.js';
import { connect } from 'http2';
const ytdl = require('ytdl-core');


export async function play(message: Message) {
        var voiceChannel: VoiceChannel = message.member.voice.channel;

        if (!message.member.voice.channel) 
            return message.reply("você deve estar conectado em um canal de voz para pedir audio do zap");

        try{
            var connection: VoiceConnection = await message.member.voice.channel.join();

        }catch(error: any){
            return message.channel.send(`erro ${error}`)
        }
        let args: Array<string> = message.content.split(" ");

        if(args[1] === 'choquedauva'){
            const dispatcher = connection.play(ytdl('https://www.youtube.com/watch?v=y2eI5SLCBQU', { filter: 'audioonly' }))
                .on('start', () => {
                    console.log("CHOQUE DA UVA");
                })
                .on('finish', () => {
                    console.log("Fim do choque da uva");
                    return voiceChannel.leave();
                })
                .on('error', error => { 
                    console.log(`erro na reproducao do choque da uva: ${error}`);
                    return message.channel.send(`erro na reproducao do choque da uva: ${error}`)
                });
        }else{
            const dispatcher = connection.play(ytdl(args[1], { filter: 'audioonly' }))
        }
    }

