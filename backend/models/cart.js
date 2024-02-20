const mongoose = require('mongoose');

const { Schema } = mongoose;
const cartSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'courses' }],
});
module.exports = mongoose.model('cartitem', cartSchema);
