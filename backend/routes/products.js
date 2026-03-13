const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// @route   POST /api/products
// @desc    Add a new product
router.post('/', async (req, res) => {
    try {
        const { name, price, description, businessId } = req.body;

        if (!name || !price || !description || !businessId) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const newProduct = new Product({
            name,
            price,
            description,
            businessId
        });

        const product = await newProduct.save();
        res.status(201).json(product);
    } catch (error) {
        console.error('Add product error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/products
// @desc    Get all products, optionally filtered by search query
router.get('/', async (req, res) => {
    try {
        const query = {};
        if (req.query.q) {
            query.name = { $regex: req.query.q, $options: 'i' }; // Case-insensitive search
        }
        
        // Populate the businessId to get the business owner's details (e.g., fullName)
        const products = await Product.find(query)
            .populate('businessId', 'fullName email')
            .sort({ createdAt: -1 });
            
        res.json(products);
    } catch (error) {
        console.error('Get all products error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/products/:businessId
// @desc    Get all products for a specific business
router.get('/:businessId', async (req, res) => {
    try {
        const products = await Product.find({ businessId: req.params.businessId }).sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        console.error('Get business products error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
