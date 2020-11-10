export class Audio {
    public url: string;
    public channelId: string;
    public volume: number;

    constructor(url: string, channelId: string, volume: number = 0.5){
        this.url = url;
        this.channelId = channelId;
        this.volume = volume;
    }

}