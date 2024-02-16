const mongoose = require('mongoose');

const { Schema } = mongoose;
const recentlyviewedSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'courses'  },
}, { timestamps: true });

module.exports = mongoose.model('recentlyviewed', recentlyviewedSchema);
