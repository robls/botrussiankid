import Config from "../models/Config";

export interface IConfigDal {
    save(userId: string, config: string): void;
    delete(configId: number): Promise<void>
    update(userId: string, config: string): Promise<void>;
    getByUserId(userId: string): Promise<Config | null>;
}