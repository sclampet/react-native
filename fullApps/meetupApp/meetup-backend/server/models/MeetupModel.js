const mongoose = require('mongoose');

const { Schema } = mongoose;

const MeetupSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: [5, 'Must be 5 characters long'],
  },
  description: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
  },
}, { timestamps: true });

module.exports = mongoose.model('Meetup', MeetupSchema);
