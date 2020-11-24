import Config from "../models/Config";

export interface IConfigDal {
    save(userId: number, config: string): void;
    update(userId: number,config: string): void;
    getByUserId(userId: number): Promise<Config | null>;
}