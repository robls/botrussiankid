import { GuildMember, Message } from "discord.js";
import { findMemberById } from './helper/member.helper';
import { PREFIX } from "./config";

export async function run(message: Message): Promise<void>{
    let vtnc = [
        'пошёл на хуй ✋',
        'VTNC 😎'
    ];

    if(message.author.bot) return;

    if(!message.content.startsWith(PREFIX)) return;
    
    if(message.content.startsWith(`${PREFIX}russiankid`)){
        //.gifLoop.run(message);
    }else if(message.content.startsWith(`${PREFIX}vandao`)){
        message.channel.send("Vandão sem skim dá mais dano", {
            tts: true
        });
        return;
    }else if(message.content.startsWith(`${PREFIX}iskawa`)){
        let index = Math.floor(Math.random() * vtnc.length);
        let id = "293901352977956866";
        let member:GuildMember = await findMemberById(id, message.guild); 
        let msg: string;

        console.log(member.user.username);
        if(!member){
            msg = "Cade o Iskawa porra ??"; 
        }else{
            msg = `${vtnc[index]} <@${member.id}>`;
        }
        await message.channel.send(msg);

        return undefined;
        
    }else if(message.content.startsWith(">")){
        message.channel.send("Comando não reconhecido. Envie >comandos para a lista completa de comandos.");
        return;
    }
}   