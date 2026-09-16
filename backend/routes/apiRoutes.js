const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect, authorize } = require('../middleware/authMiddleware');
const ArtWork = require('../models/ArtWork');
const Contribution = require('../models/Contribution');

// Multer Config
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// ArtWork Routes (Artisan specific)
router.post('/artworks', protect, authorize('artisan', 'admin'), upload.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    const artWork = await ArtWork.create({
      title,
      description,
      imageUrl: `/uploads/${req.file.filename}`,
      artisan: req.user._id
    });

    res.status(201).json(artWork);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/artworks', async (req, res) => {
  try {
    const artworks = await ArtWork.find().populate('artisan', 'name');
    res.json(artworks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Contribution Routes (Organization & Expert specific)
router.post('/contributions', protect, authorize('organization', 'admin'), async (req, res) => {
  try {
    const { title, content, category } = req.body;
    
    const contribution = await Contribution.create({
      title,
      content,
      category,
      submittedBy: req.user._id
    });

    res.status(201).json(contribution);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/contributions', async (req, res) => {
  try {
    const contributions = await Contribution.find().populate('submittedBy', 'name');
    res.json(contributions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/contributions/:id/verify', protect, authorize('expert', 'admin'), async (req, res) => {
  try {
    const { status } = req.body; // 'Approved' or 'Rejected'
    
    const contribution = await Contribution.findById(req.params.id);
    if (!contribution) {
      return res.status(404).json({ message: 'Contribution not found' });
    }

    contribution.verificationStatus = status;
    contribution.verifiedBy = req.user._id;
    await contribution.save();

    res.json(contribution);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
