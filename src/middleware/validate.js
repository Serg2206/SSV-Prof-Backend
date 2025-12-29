// src/middleware/validate.js

const validateLibraryMaterial = (req, res, next) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: 'Title and Author are required.' });
  }

  next();
};

module.exports = { validateLibraryMaterial };
