import { Message } from "discord.js";


export class GifLoop {
    private channels: string[] = new Array<string>();

    constructor(){ 
        this.russianKidLoop();
    }

    public run(message: Message): void{
        if(!this.channels.includes(message.channel.id)){
            this.channels.push(message.channel.id);
            message.channel.send("CYKA BLYAT // >russiankid caso se arrependa");  
            this.russianKidLoop(message);
        }else {
            let channelIndex = this.channels.findIndex(channelId => channelId == message.channel.id);
            if (channelIndex >= 0){
                message.channel.send("Blz parei");
                this.channels.splice(channelIndex, 1);
            }
        }
    }

    private russianKidLoop = (message: Message = null, ) => {
        setInterval( cb => {
            this.channels.forEach( channelId => {
                if(message.channel.id === channelId){
                    message.channel.send("https://tenor.com/view/kid-meme-dancing-37-nation-gif-5514765");
                }
            });
        }, 10  * 1000);
    }
    
} 