import { Message } from "discord.js";
import { PREFIX } from "./shared/config";
import { iskawa } from "./commands/iskawa";
import { x5 } from './entities/x5';
import { ConfigController } from './infra/controller/configController';

export async function run(message: Message): Promise<void>{

    const configController: ConfigController = new ConfigController();

    if(message.author.bot) return;

    if(!message.content.startsWith(PREFIX)) return;
    
    if(message.content.startsWith(`${PREFIX}russiankid`)){
        message.channel.send("https://tenor.com/view/kid-meme-dancing-37-nation-gif-5514765");
        return undefined;
    }else if(message.content.startsWith(`${PREFIX}vandao`)){
        message.channel.send("Vandão sem skim dá mais dano", {
            tts: true
        });
        return;
    }else if(message.content.startsWith(`${PREFIX}iskawa`)){
        iskawa(message);
        return undefined;
    }else if(message.content.startsWith(`${PREFIX}x5`)){
        message.channel.send(`Os capitães devem enviar o comando ${PREFIX}time`);
        let x5: x5;
    }else if(message.content.startsWith(`${PREFIX}config`)){
        await configController.run(message);
        return;
    }else if(message.content.startsWith(PREFIX)){
        message.channel.send(`Comando não reconhecido. Envie ${PREFIX}comandos para a lista completa de comandos.`);
        return;
    }
}   