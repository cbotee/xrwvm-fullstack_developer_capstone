
const { Int32 } = require('mongodb');

/*jshint esversion: 8 */
const mongoose = require('mongoose');

/*jshint esversion: 8 */
const Schema = mongoose.Schema;

/*jshint esversion: 8 */
const cars = new Schema({
dealer_id: {
    type: Number,
    required: true
},
make: {
    type: String,
    required: true
  },
model: {
    type: String,
    required: true
  },
bodyType: {
    type: String,
    required: true
  },
year: {
    type: Number,
    required: true
  },
mileage: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('cars', cars);
