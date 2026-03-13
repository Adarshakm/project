const express = require('express');
const router = express.Router();
const SearchResult = require('../models/SearchResult');

// @route   GET /api/search
// @desc    Get search results matching a query
router.get('/', async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.json([]);
        }

        // Case-insensitive regex to match title, description, or domain
        const regex = new RegExp(q, 'i');

        const results = await SearchResult.find({
            $or: [
                { title: { $regex: regex } },
                { description: { $regex: regex } },
                { url: { $regex: regex } }
            ]
        }).limit(20); // Limit results for better performance

        res.json(results);
    } catch (error) {
        console.error('Error fetching search results:', error);
        res.status(500).json({ message: 'Server error fetching search results' });
    }
});

module.exports = router;
