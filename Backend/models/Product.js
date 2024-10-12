import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String
  },
  section: {
    type: String,
    enum: ['Pharmacy', 'Home', 'Market', 'Tek'],
    required: true
  }
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

export default Product;
