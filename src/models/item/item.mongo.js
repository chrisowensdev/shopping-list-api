const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  aisleLocations: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
});

module.exports = mongoose.model('Item', itemSchema);
