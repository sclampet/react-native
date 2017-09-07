const path = require('path');

const MeetupController = require(path.resolve('server', 'controllers', 'MeetupController'));
const GroupController = require(path.resolve('server', 'controllers', 'GroupController'));

module.exports = function (app) {
  app
    .post('/meetups', MeetupController.createMeetup)
    .get('/meetups', MeetupController.findAllMeetups)
    .post('/groups/new', GroupController.createGroup)
    .post('/groups/:groupId/meetups/new', GroupController.createGroupMeetup)
    .get('/groups/:groupId/meetups', GroupController.getGroupMeetups);
};
