import Product from '../models/Product.js';

// Controlador para agregar un nuevo producto
export const agregarProducto = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controlador para obtener todos los productos
export const obtenerProductos = async (req, res) => {
  try {
    const productos = await Product.find();
    res.status(200).json(productos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
