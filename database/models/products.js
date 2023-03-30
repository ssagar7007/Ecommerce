const mongoose = require('mongoose');
const { Schema } = mongoose;

const productsSchema = new Schema({
  name: String,
  description: String,
  image: String,
});

const ProductModel = new mongoose.model("products", productsSchema);

module.exports = ProductModel;

