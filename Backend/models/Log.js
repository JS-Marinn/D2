// models/Log.js
import mongoose from 'mongoose';

const logSchema = mongoose.Schema({
  adminName: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  endpoint: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const Log = mongoose.model('Log', logSchema);

export default Log;
