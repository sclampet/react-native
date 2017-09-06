const express = require('express');
const path = require('path');

const port = process.env.PORT || 3000;
const parser = require('body-parser');
const morgan = require('morgan');

const app = express();

// Database
require(path.resolve('server', 'config', 'db'));

// Middleware
app.use(parser.json())
  .use(parser.urlencoded({ extended: false }))
  .use(morgan('dev'));

// Routes
require(path.resolve('server', 'config', 'routes'))(app);

app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`listening on port ${port}`);
  }
});
