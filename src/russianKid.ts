import { Collection, GuildMember, Message } from "discord.js";
import { GifLoop } from "./commands/gifLoop";
import { AudioPlayer } from './commands/audioPlayer';
import { findMemberById } from './helper/member.helper';
import { PREFIX } from "./config";

export class RussianKid {
    private gifLoop: GifLoop;
    private audioPlayer: AudioPlayer;

    constructor(){
        this.gifLoop = new GifLoop();
        this.audioPlayer = new AudioPlayer();
    } 



    public async run(message: Message): Promise<void> {
        let vtnc = [
            'пошёл на хуй ✋',
            'VTNC 😎'
        ];

        if(message.author.bot) return undefined;

        if(!message.content.startsWith(PREFIX)) return undefined;
        
        if(message.content.startsWith(`${PREFIX}russiankid`)){
            this.gifLoop.run(message);
        }else if(message.content.startsWith(`${PREFIX}vandao`)){
            message.channel.send("Vandão sem skim dá mais dano", {
                tts: true
            });
            return;
        }else if(message.content.startsWith(`${PREFIX}play`) || message.content.startsWith(`{PREFIX}stop`)){
            this.audioPlayer.play(message);
        }else if(message.content.startsWith(`${PREFIX}iskawa`)){
            let id = "293901352977956866";
            let member:GuildMember =  await findMemberById(id, message.guild); 

            let index = Math.floor(Math.random() * vtnc.length);

            if(!member)
                message.channel.send("Parece que o Iskawa não está no servidor ! Certifique-se que ele esteja presente.");

            message.channel.send(`${vtnc[index]} <@${member.id}>`);
        }
    }    
}