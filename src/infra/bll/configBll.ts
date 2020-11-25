import { ConfigDal } from "../dal/configDal";
import { IConfigDal } from '../interface/IConfigDal';

export class ConfigBll {
    private _configDal: IConfigDal;

    constructor(){ 
        this._configDal = new ConfigDal();
    }

    public async save(userId: string, userConfig: string) {
        return await this._configDal.save(userId, userConfig);
    }

    public update(){
        
    }

    public async getByUserId(userId: string){
        return await this._configDal.getByUserId(userId);
    }
}