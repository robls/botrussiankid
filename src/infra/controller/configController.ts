import { Emoji, GuildMember, Message, MessageEmbed, MessageReaction, ReactionEmoji } from "discord.js";
import { config } from "dotenv/types";
import { send } from "process";
import { ConfigBll } from "../bll/configBll";

export class ConfigController {
    private configBll: ConfigBll;
    private awaitTime: number = 300000;
    private existingConfigEmojis = ['👍', '👎'];
    private noConfigEmojis = ['🧾'];
    private sharedConfigEmojis = ['❌'];
    private allConfigEmojis = [...this.existingConfigEmojis, ...this.noConfigEmojis, ...this.sharedConfigEmojis];

    constructor(){
        this.configBll = new ConfigBll();
    }

    public async run(message: Message): Promise<any> {
        let userId:string = message.member.id;
        let userConfig = await this.configBll.getByUserId(userId);
        let returnMsg: MessageEmbed = new MessageEmbed();

        console.log(userConfig);

        if(userConfig){
            returnMsg
                .setTitle('🇷🇺 😎RUSSIAN KID CONFIG - BETA😎 🇷🇺')
                .addField('Sua config: ', `**${userConfig.user_config}**`)
                .addField('Comandos', 'Reaja a essa mensagem de acordo com o que deseja')
                .addField('Atualizar config', '👍', true)
                .addField('Deletar config', '👎', true);
        }else {
            returnMsg
                .setTitle('🇷🇺 😎RUSSIAN KID CONFIG - BETA😎 🇷🇺')
                .addField('Comandos', 'Reaja a essa mensagem de acordo com o que deseja')
                .addField('Nova config', '🧾', true);
        }

        returnMsg.addField('Cancelar', '❌', true);

        message.channel.send(returnMsg).then(async (sentEmbed) => {
            if(userConfig){
                this.existingConfigEmojis.forEach( async emoji => {
                    await sentEmbed.react(emoji);
                });
            }else {
                this.noConfigEmojis.forEach( async emoji => {
                    await sentEmbed.react(emoji);
                });
            }
            await sentEmbed.react('❌');

            this.resolveReply(sentEmbed, userConfig, userId);
        });

    }
    
    
    private resolveReply(message: Message, userConfig: any, senderId: string){
        const filter = (reaction: MessageReaction) => {
            return this.allConfigEmojis.includes(reaction.emoji.name);
        };

        message.awaitReactions(filter, { max: 1, time: this.awaitTime, errors: ['time'] })
            .then(async collected => {
                let collectedReaction = collected.firstKey();

                if(collectedReaction == '🧾'){
                    await message.channel.send('🇷🇺 Digite e envie sua config aqui no chat. 🇷🇺');
                    this.resolveConfigSet(message, senderId);
                }else if(collectedReaction == '👎'){
                    await this.resolveConfigDelete(userConfig.id);
                    message.channel.send('🇷🇺 Config deletada 🇷🇺');
                }else if(collectedReaction == '👍'){
                    await message.channel.send('🇷🇺 Digite e envie sua config aqui no chat. 🇷🇺');
                    await this.resolveConfigUpdate(message, senderId);
                }else if(collectedReaction == '❌'){
                    await message.channel.send('🇷🇺 vlw otario(a) 🇷🇺');
                    return undefined;
                }

            });

    }
    
    private resolveConfigSet(message: Message, userId: string){
        
        let filter = (m: Message) => m.author.id === userId;
        
        message.channel.awaitMessages(filter, { max: 1, time: this.awaitTime, errors: ['time'] })
        .then(async collected => {
            let collectedAnswer: Message = collected.first();
            let userConfig = collectedAnswer.content;

            try{
                await this.configBll.save(userId, userConfig);
                await message.channel.send('Config foi salva com sucesso bro wow faz sol 😎😎');
            }catch(error) {
                await message.channel.send('Houve um erro ao salvar sua config.');
            }
        });
    }

    private resolveConfigUpdate(message: Message, userId: string){
        
        let filter = (m: Message) => m.author.id === userId;
        
        message.channel.awaitMessages(filter, { max: 1, time: this.awaitTime, errors: ['time'] })
        .then(async collected => {
            let collectedAnswer: Message = collected.first();
            let userConfig = collectedAnswer.content;
            try{
                await this.configBll.update(userId, userConfig);
                await message.channel.send('Config atualizada com sucesso bro wow faz sol 😎😎');
            }catch(error) {
                await message.channel.send('Houve um erro ao atualizar sua config.');
            }
        });
    }

    private async resolveConfigDelete(configId: number){
        await this.configBll.delete(configId);
    }
}