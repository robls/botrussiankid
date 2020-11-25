import { IConfigDal } from "../interface/IConfigDal";
import Config  from "../models/Config";
import ConfigRepository from '../../database/models/config.model';

export class ConfigDal implements IConfigDal {
    public async save(userId: string, config: string) {
        let newConfig = await ConfigRepository.create({
            user_id: userId,
            user_config: config
        });
    }

    public async delete(configId: number): Promise<void>{
        let configToBeDeleted = await ConfigRepository.findOne({
            where: {
                id: configId
            }
        })
        console.log(configId, configToBeDeleted);
        if(configToBeDeleted)
            configToBeDeleted.destroy();
    }

    public async update(userId: string, config: string): Promise<void> {
        let configToBeUpdated = await ConfigRepository.findOne({
            where: {
                user_id: userId
            }
        });

        await configToBeUpdated.update({
            user_id: userId,
            user_config: config
        });
    }

    public async getByUserId(userId: string): Promise<Config> {
        let queryResult = await ConfigRepository.findOne({
            where: {
                user_id: userId
            }
        }); 
        console.log(queryResult);
        if(queryResult){
            let config: Config = new Config();
            let queryData = queryResult.get();

            config.id = queryData.id;
            config.user_id = queryData.user_id;
            config.user_config = queryData.user_config;

            return config;
        } else {
            return null;
        }
    }
}