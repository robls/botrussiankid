import { ConfigDal } from "../dal/configDal";
import { IConfigBll } from "../interface/IConfigBll";
import { IConfigDal } from '../interface/IConfigDal';

export class ConfigBll implements IConfigBll {
    private _configDal: IConfigDal;

    constructor(){ 
        this._configDal = new ConfigDal();
    }

    public save(){

    }

    public update(){

    }

    public async getByUserId(userId: string){
        return await this._configDal.getByUserId(parseInt(userId));
    }
}