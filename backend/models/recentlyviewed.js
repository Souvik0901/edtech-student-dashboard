const mongoose = require('mongoose');

const { Schema } = mongoose;
const recentlyviewedSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, default: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, default: true },
  viewTime: {type: Date, default: Date.now }
});

module.exports = mongoose.model('recentlyviewed', recentlyviewedSchema);
