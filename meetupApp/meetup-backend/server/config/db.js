const mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/meetupApp');

mongoose.connection
  .once('open', () => console.log('DB Connected!'))
  .on('err', err => console.log(err));
