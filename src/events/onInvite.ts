import { Collection, GuildChannel, GuildMember, Invite, MessageEmbed, TextChannel } from "discord.js";
import { findMemberById } from '../shared/helper/member.helper';
import { colors } from '../shared/colors';

export async function onInvite(inviteCreated: Invite): Promise<void> {
    let guildChannels: Collection<string, GuildChannel> = inviteCreated.guild.channels.cache;
    let textChannel: TextChannel;
    
    let logTextChannelIds: string[] = [
        '679029675720441879',
        '775764234658119720'
    ];

    logTextChannelIds.forEach(channel => {
        if(!textChannel)
            textChannel = <TextChannel> guildChannels.find(guildChannel => guildChannel.id === channel);
    });
    
    let inviter: GuildMember = await findMemberById(inviteCreated.inviter.id, inviteCreated.guild);

    if(textChannel && inviteCreated.guild === textChannel.guild){
        let embedLogMessage: MessageEmbed = new MessageEmbed();
        embedLogMessage
            .setTitle('Convite gerado')
            .addField('Expira em:', inviteCreated.expiresAt)
            .addField('Id de quem criou:', `Id do criador <@${inviter.id}>`)
            .addField('Username na data de criacao:', inviter.user.username)
            .setColor(colors.yellow)
            .setTimestamp(inviteCreated.createdAt)

        textChannel.send(embedLogMessage);
    }
}