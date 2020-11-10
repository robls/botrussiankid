import { Message } from "discord.js";

export class Vandao {
    constructor(){

    }

    public run(message: Message): void{
        message.channel.send("VANDÃO SEM SKIM DA MAIS DANO", {
            tts: true
        });
    }
}