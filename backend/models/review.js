const mongoose = require('mongoose');

const { Schema } = mongoose;
const reviewSchema = new Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'courses' },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  review: { type: String, default: '' },
  reply: { type: String, default: '' },
  ratings: { type: String, default: null },
});

module.exports = mongoose.model('reviews', reviewSchema);
