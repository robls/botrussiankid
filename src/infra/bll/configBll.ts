import { ConfigDal } from "../dal/configDal";
import { IConfigDal } from '../interface/IConfigDal';

export class ConfigBll {
    private configDal: IConfigDal;

    constructor(){ 
        this.configDal = new ConfigDal();
    }

    public async save(userId: string, userConfig: string) {
        return await this.configDal.save(userId, userConfig);
    }

    public async delete(configId: number){
        return await this.configDal.delete(configId);
    }

    public async update(userId: string, userConfig: string){
        return await this.configDal.update(userId, userConfig);
    }

    public async getByUserId(userId: string){
        return await this.configDal.getByUserId(userId);
    }
}