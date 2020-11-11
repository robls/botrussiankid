import { Collection, GuildChannel, GuildMember, Invite, TextChannel } from "discord.js";
import { MemberHelper } from '../helper/member.helper';

export async function onInvite(inviteCreated: Invite): Promise<void> {
    const _memberHelper: MemberHelper = new MemberHelper();
    
    let guildChannels: Collection<string, GuildChannel> = inviteCreated.guild.channels.cache;

    let textChanel: TextChannel = <TextChannel> guildChannels.find(guildChannel => guildChannel.id === '775764234658119720');
    
    let inviter: GuildMember = await _memberHelper.findMemberById(inviteCreated.inviter.id, inviteCreated.guild);
    const d = new Date(inviteCreated.createdTimestamp);
    let date = d.getHours() + ":" + d.getMinutes();

    if(textChanel)
        textChanel.send(`Convite criado. \n <@${inviter.id}> \n ${date}`);
}