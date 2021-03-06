/* eslint-disable no-console */

const express = require('express');
const dbConfig = require('./config/db');
const middlewaresConfig = require('./config/middlewares');
import { MeetupRoutes, GroupRoutes, UserRoutes } from './modules';

const app = express();

/**
* Database
*/
dbConfig();
/**
* Middlewares
*/
middlewaresConfig(app);

app.use('/api', [MeetupRoutes, GroupRoutes, UserRoutes]);

const PORT = process.env.PORT || 3000;

app.listen(PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`App listen to port: ${PORT}`);
  }
});
