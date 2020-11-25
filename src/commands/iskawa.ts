import { GuildMember, Message } from "discord.js";
import { findMemberById } from "../shared/helper/member.helper";

let vtnc = [
    'пошёл на хуй ✋',
    'VTNC 😎'
];

export async function iskawa(message: Message): Promise<void>{
    let index = Math.floor(Math.random() * vtnc.length);
    let id = "293901352977956866";
    let member:GuildMember = await findMemberById(id, message.guild); 
    let msg: string;

    if(!member){
        msg = "Cade o Iskawa porra ??"; 
    }else{
        msg = `${vtnc[index]} <@${member.id}>`;
    }
    await message.channel.send(msg);

    return undefined;
}