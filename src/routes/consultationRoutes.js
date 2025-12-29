const express = require('express');
const router = express.Router();

// Mock consultation data
const consultations = [
  {
    id: 1,
    doctorName: 'Проф. Иванов И.И.',
    specialization: 'Нейрохирургия',
    availableDates: ['2025-01-15', '2025-01-20', '2025-01-25'],
    duration: '45 минут',
    type: 'online'
  },
  {
    id: 2,
    doctorName: 'Dr. Smith J.',
    specialization: 'Spinal Surgery',
    availableDates: ['2025-01-18', '2025-01-22', '2025-01-28'],
    duration: '30 minutes',
    type: 'in-person'
  },
  {
    id: 3,
    doctorName: 'Д-р Петров П.П.',
    specialization: 'Ортопедия',
    availableDates: ['2025-01-16', '2025-01-23', '2025-01-30'],
    duration: '1 час',
    type: 'online'
  }
];

// @route   GET /api/consultation
// @desc    Get all available consultations
// @access  Public
router.get('/', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: consultations.length,
      data: consultations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// @route   GET /api/consultation/:id
// @desc    Get single consultation
// @access  Public
router.get('/:id', (req, res) => {
  try {
    const consultation = consultations.find(c => c.id === parseInt(req.params.id));
    
    if (!consultation) {
      return res.status(404).json({
        success: false,
        error: 'Consultation not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: consultation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// @route   POST /api/consultation/:id/book
// @desc    Book a consultation
// @access  Public (should be protected in production)
router.post('/:id/book', (req, res) => {
  try {
    const consultation = consultations.find(c => c.id === parseInt(req.params.id));
    
    if (!consultation) {
      return res.status(404).json({
        success: false,
        error: 'Consultation not found'
      });
    }
    
    const { date, patientInfo } = req.body;
    
    if (!date || !consultation.availableDates.includes(date)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or unavailable date'
      });
    }
    
    // In production, save booking to database
    res.status(200).json({
      success: true,
      message: 'Consultation booked successfully',
      data: {
        consultationId: consultation.id,
        doctor: consultation.doctorName,
        date: date,
        type: consultation.type,
        patientInfo: patientInfo
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// @route   GET /api/consultation/specialization/:spec
// @desc    Get consultations by specialization
// @access  Public
router.get('/specialization/:spec', (req, res) => {
  try {
    const filtered = consultations.filter(c => 
      c.specialization.toLowerCase().includes(req.params.spec.toLowerCase())
    );
    
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
