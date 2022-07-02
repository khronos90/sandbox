import { Sequelize } from 'sequelize';
import { dbConfig } from './config/db';

export const sequelize = new Sequelize({
  ...dbConfig,
});
