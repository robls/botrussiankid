import { Sequelize, Model, DataTypes } from 'sequelize';
import database from '../../database';


const ConfigRepository = database.connection.define('config', {
    user_id: DataTypes.STRING,
    user_config: DataTypes.STRING,
});

export default ConfigRepository;