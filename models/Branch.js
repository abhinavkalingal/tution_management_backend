// models/Branch.js
const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String },
  address: { type: String },
  contact: { type: String },
  meta: { type: Object }
}, { timestamps: true });

module.exports = mongoose.model('Branch', branchSchema);
