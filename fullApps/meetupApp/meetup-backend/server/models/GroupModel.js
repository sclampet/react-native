const mongoose = require('mongoose');

const { Schema } = mongoose;

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: [5, 'Name must be at least 5 characters long'],
  },
  description: {
    type: String,
    required: true,
    minLength: [10, 'Description must be at least 5 characters long'],
  },
  category: {
    type: String,
    required: true,
  },
  meetups: [{
    type: Schema.Types.ObjectId,
    ref: 'Meetup',
  }],
}, { timestamps: true });

// Create a meetup and add it to the meetups array in group
GroupSchema.statics.addMeetup = async function (id, args) {
  const Meetup = mongoose.model('Meetup');
  // We add the group id to the meetup group element
  // Finally this is the author of the meetup
  const meetup = await new Meetup({ ...args, group: id });
  // We found the group with the id provided in the url
  // And we push the meetup id in the meetups element
  const group = await this.findByIdAndUpdate(id, { $push: { meetups: meetup.id } });

  return {
    meetup: await meetup.save(),
    group,
  };
};

module.exports = mongoose.model('Group', GroupSchema);
