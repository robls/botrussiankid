import Config from "../models/Config";

export interface IConfigDal {
    save(userId: string, config: string): void;
    update(userId: string,config: string): void;
    getByUserId(userId: string): Promise<Config | null>;
}