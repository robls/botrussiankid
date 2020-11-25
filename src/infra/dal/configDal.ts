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

    public update(userId: string, config: string) {
    }

    public async getByUserId(userId: string): Promise<Config> {
        let queryResult = await ConfigRepository.findOne({
            where: {
                user_id: userId
            }
        }); 

        if(queryResult){
            let config: Config = new Config();
            let queryData = queryResult.get();

            config.user_id = queryData.user_id;
            config.user_config = queryData.user_config;

            return config;
        }else {
            return null;
        }
    }
}