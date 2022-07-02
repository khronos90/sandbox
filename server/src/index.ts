import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { db } from './db';
import Tutorial from './db/models/tutorial';

import router from './routes';

const app = express();
const port = process.env.PORT;

app.use('/', router);

app.listen(port, async () => {
  console.log(`App started at port ${port}`);
  try {
    await db.sequelize.authenticate();
    console.log('Db connection started successfully');
    console.log(typeof Tutorial);
  } catch (e) {
    console.log(`DB connection failed with error ${e}`);
  }

  if (process.env.ENV === 'dev') {
    try {
      await db.sequelize.sync({ force: true });
      console.log('All models were synchronized successfully.');
    } catch (e) {
      console.log(e);
    }
  }
});
