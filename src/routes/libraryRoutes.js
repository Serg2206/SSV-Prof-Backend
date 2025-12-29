const express = require('express');
const router = express.Router();

// Mock library data (replace with database later)
const libraryItems = [
  {
    id: 1,
    title: 'Руководство по хирургии позвоночника',
    author: 'Иванов И.И.',
    year: 2023,
    category: 'surgery',
    description: 'Современные методы хирургического лечения'
  },
  {
    id: 2,
    title: 'SSV Analysis in Spinal Surgery',
    author: 'Smith J.',
    year: 2024,
    category: 'research',
    description: 'Clinical applications of SSV measurement'
  },
  {
    id: 3,
    title: 'Нейрохирургия: Основы',
    author: 'Петров П.П.',
    year: 2022,
    category: 'neurosurgery',
    description: 'Фундаментальные принципы'
  }
];

// @route   GET /api/library
// @desc    Get all library items
// @access  Public
router.get('/', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: libraryItems.length,
      data: libraryItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// @route   GET /api/library/:id
// @desc    Get single library item
// @access  Public
router.get('/:id', (req, res) => {
  try {
    const item = libraryItems.find(i => i.id === parseInt(req.params.id));
    
    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Library item not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// @route   GET /api/library/category/:category
// @desc    Get library items by category
// @access  Public
router.get('/category/:category', (req, res) => {
  try {
    const filtered = libraryItems.filter(i => i.category === req.params.category);
    
    res.status(200).json({
      success: true,
      count: filtered.length,
      data: filtered
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

module.exports = router;
