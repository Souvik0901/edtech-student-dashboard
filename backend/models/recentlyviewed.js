const mongoose = require('mongoose');

const { Schema } = mongoose;
const recentlyviewedSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, default: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, default:true },
});

module.exports = mongoose.model('recentlyviewed', recentlyviewedSchema);
