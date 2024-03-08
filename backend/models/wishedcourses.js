const mongoose = require('mongoose');

const { Schema } = mongoose;
const wishedcoursesSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: false },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'courses' },
  },
  { timestamps: true },
);

module.exports = mongoose.model('wishedCourses', wishedcoursesSchema);
