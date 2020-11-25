import { Emoji, GuildMember, Message, MessageEmbed, MessageReaction, ReactionEmoji } from "discord.js";
import { config } from "dotenv/types";
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
                .addField('🇷🇺 SUA CONFIG 🇷🇺', `**${userConfig.user_config}**`)
                .addField('Lista de comandos', '-')
                .addField('👍', 'Atualizar sua config')
                .addField('👎', 'Remover sua config da base de dados');
        }else {
            returnMsg
                .addField('🇷🇺 Ruski CONFIG 2.0 🇷🇺', 'Lista de comandos')
                .addField('🧾', 'Salvar sua config');
        }

        returnMsg.addField('❌', 'Cancelar a operação');

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
                    await message.channel.send('🇷🇺 Agora envie sua config aqui no chat.');
                    this.resolveConfigSet(message, senderId);
                }else if(collectedReaction == '👎'){
                    this.resolveConfigDelete(userConfig.id);
                }else if(collectedReaction == '👍'){
    
                }else if(collectedReaction == '❌'){
                    await message.channel.send('🇷🇺 Config cancelada 🇷🇺');
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

    private async resolveConfigDelete(configId: number){
        await this.configBll.delete(configId);
    }
}