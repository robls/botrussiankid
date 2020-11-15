import { Collection, Guild, GuildMember } from "discord.js";

export async function findMemberById(id: string, guild: Guild): Promise<GuildMember> {
    let member: GuildMember;
    let members: Collection<string, GuildMember>;

    await guild.members.fetch({ user: [id], withPresences: true }).then( result => members = result);

    member = members.find(channelMember => channelMember.id === id);

    return member;
}
