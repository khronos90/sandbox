import { Options } from 'sequelize';

export const dbConfig: Options = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.HOST,
  dialect: 'mysql',
  database: 'tutorials',
  logging: console.log,
};
