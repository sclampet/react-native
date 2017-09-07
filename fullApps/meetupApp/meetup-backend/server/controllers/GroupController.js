const Group = require('../models/GroupModel');
const Meetup = require('../models/MeetupModel');


module.exports = {
  async createGroup(req, res) {
    const { name, description, category } = req.body;
    // Name validations
    if (!name) {
      return res.status(400).json({ error: true, message: 'Name must be provided' });
    } else if (typeof name !== 'string') {
      return res.status(400).json({ error: true, message: 'Name must be a string' });
    } else if (name.length < 5) {
      return res.status(400).json({ error: true, message: 'Name must be at least 5 characters long' });
    }
    // Description validations
    if (!description) {
      return res.status(400).json({ error: true, message: 'Description must be provided' });
    } else if (typeof description !== 'string') {
      return res.status(400).json({ error: true, message: 'Description must be a string' });
    } else if (description.length < 10) {
      return res.status(400).json({
        error: true,
        message: 'Description must be at least 10 characters long',
      });
    }

    const newGroup = new Group({ name, description, category });

    try {
      return res.status(201).json({ error: false, group: await newGroup.save() });
    } catch (e) {
      return res.status(400).json({ error: true, message: 'Error when creating Group' });
    }
  },

  async createGroupMeetup(req, res) {
    const { title, description } = req.body;
    const { groupId } = req.params;
    // Name validations
    if (!title) {
      return res.status(400).json({ error: true, message: 'Title must be provided' });
    } else if (typeof title !== 'string') {
      return res.status(400).json({ error: true, message: 'Title must be a string' });
    } else if (title.length < 5) {
      return res.status(400).json({ error: true, message: 'Title must be at least 5 characters long' });
    }
    // Description validations
    if (!description) {
      return res.status(400).json({ error: true, message: 'Description must be provided' });
    } else if (typeof description !== 'string') {
      return res.status(400).json({ error: true, message: 'Description must be a string' });
    } else if (description.length < 10) {
      return res.status(400).json({ error: true, message: 'Description must be at least 10 characters long' });
    }

    if (!groupId) {
      return res.status(400).json({ error: true, message: 'GroupId bust be provided' });
    }

    try {
      const { meetup, group } = await Group.addMeetup(groupId, { title, description });

      return res.status(201).json({ error: false, meetup, group });
    } catch (e) {
      return res.status(400).json({ error: true, message: 'GroupId bust be provided' });
    }
  },

  async getGroupMeetups(req, res) {
    const { groupId } = req.params;

    if (!groupId) {
      return res.status(400).json({ error: true, message: 'You need to proved a group id' });
    }

    // Search to see if group exists
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(400).json({ error: true, message: 'This group does not exist' });
    }

    try {
      return res.status(201).json({
        error: false,
        meetups: await Meetup.find({ group: groupId }).populate('group', 'name'),
      });
    } catch (e) {
      return res.status(400).json({ error: true, message: 'Cannot fetch meetups' });
    }
  },
};
