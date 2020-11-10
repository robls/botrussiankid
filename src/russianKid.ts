import { Collection, GuildMember, Message } from "discord.js";
import { GifLoop } from "./commands/gifLoop";
import { Vandao } from "./commands/vandao";
import { AudioPlayer } from './commands/audioPlayer';
import { PREFIX } from "./config";

export class RussianKid {
    private gifLoop: GifLoop;
    private vandao: Vandao;
    private audioPlayer: AudioPlayer;

    constructor(){
        this.gifLoop = new GifLoop();
        this.vandao = new Vandao();
        this.audioPlayer = new AudioPlayer();
    } 

    private vtnc = [
        'пошёл на хуй ✋',
        'VTNC 😎'
    ]

    public async run(message: Message): Promise<void> {
        const args: Array<string> = message.content.split(' ');
        if(message.content.startsWith(`${PREFIX}russiankid`)){
            this.gifLoop.run(message);
        }else if(message.content.startsWith(`${PREFIX}vandao`)){
            this.vandao.run(message);
        }else if(message.content.startsWith(`${PREFIX}play`) || message.content.startsWith(`{PREFIX}stop`)){
            this.audioPlayer.play(message);
        }else if(message.content.startsWith(`${PREFIX}iskawa`)){
            let id = "293901352977956866";
            let members: Collection<string, GuildMember>;

            await message.guild.members.fetch({ user: [id], withPresences: true }).then( result => members = result);

            let member: GuildMember = members.find(channelMember => channelMember.id === id);

            let index = Math.floor(Math.random() * this.vtnc.length);
            if(!member)
                message.channel.send("Parece que o Iskawa não está no servidor ! Certifique-se que ele esteja presente.");

            message.channel.send(`${this.vtnc[index]} <@${member.id}>`);
        }
    }    
}