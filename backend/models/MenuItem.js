const mongoose = require('mongoose');
const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Dish name is required'],
    unique: true
  },
  description: String,
  price: {
    type: Number,
    required: [true, 'Price is required']
  },
  category: {
    type: String,
    required: true,
    enum: ['Sushi', 'Hot Dishes', 'Appetizers', 'Desserts', 'Rolls', 'Soups']
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  image: String
});

module.exports = mongoose.model('MenuItem', menuItemSchema);