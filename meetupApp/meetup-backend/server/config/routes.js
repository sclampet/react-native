const path = require('path');
const MeetupController = require(path.resolve('server', 'controllers', 'MeetupController'))

module.exports = function(app){
  app
  .post('/meetups', MeetupController.create)
  .get('/meetups', MeetupController.findAll);

};
