import { Message, MessageEmbed } from "discord.js";
import { ConfigBll } from "../bll/configBll";

export class ConfigController {
    private configBll: ConfigBll;

    constructor(){
        this.configBll = new ConfigBll();
    }

    public async run(message: Message): Promise<any>{
        let userId:string = message.member.id;
        let userConfig = await this.configBll.getByUserId(userId);
        let returnMsg: MessageEmbed = new MessageEmbed();

        if(userConfig){
            returnMsg
                .addField('🇷🇺 CONFIG 🇷🇺', `**${userConfig.user_config}**`)
                .addField('-update', 'Atualizar sua config')
                .addField('-delete', 'Remover sua config da base de dados')
        }else {
            returnMsg
                .addField('-set', 'Salvar sua config')
        }

        message.channel.send(returnMsg).then(() => {
            this.resolveReply(message);
        });

    }
    
    
    private resolveReply(message: Message){
        let filter = (m: Message) => m.author.id === message.author.id;
        
        message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
        .then(async collected => {
            let collectedAnswer: Message = collected.first();
            console.log(collectedAnswer);
            if(collectedAnswer.content == '-set'){
                await message.channel.send('Envie sua config');
                this.resolveConfigSet(collectedAnswer);
            }else if(collectedAnswer.content == '-delete'){

            }
            else {
                return;
            }
        });
    }
    
    private resolveConfigSet(message: Message){
        let filter = (m: Message) => m.author.id === message.author.id;
        
        message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
        .then(async collected => {
            let collectedAnswer: Message = collected.first();
            let userId = message.member.id;
            let userConfig = collectedAnswer.content;

            await this.configBll.save(userId, userConfig);
            await message.channel.send('Sua config foi salva com sucesso bro wow faz sol 😎😎');
            console.log('config salva com sucesso 😎');
        });
    }
}