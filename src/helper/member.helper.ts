import { Guild, GuildMember } from "discord.js";

export async function findMemberById(id: string, guild: Guild): Promise<GuildMember> {
    let member: GuildMember;
    
    try{
        member = await guild.members.fetch(id);
        return member;
    }catch(error: any){
        console.log(error);
    }

}
