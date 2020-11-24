import { Sequelize } from 'sequelize';

import { DbConfig } from '../shared/database.config';

class Database {
    public connection: Sequelize;

    constructor(){ 
        this.connection = new Sequelize(DbConfig);
    }
}

const database: Database = new Database();

export default database;

