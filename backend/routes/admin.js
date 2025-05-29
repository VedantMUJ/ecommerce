const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Admin = require('../models/Admin');

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all products
router.get('/products', isAdmin, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new product
router.post('/products', isAdmin, async (req, res) => {
  try {
    const { name, price, description, image } = req.body;
    const product = new Product({
      name,
      price,
      description,
      image
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update product
router.put('/products/:id', isAdmin, async (req, res) => {
  try {
    const { name, price, description, image } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, image },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete product
router.delete('/products/:id', isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 