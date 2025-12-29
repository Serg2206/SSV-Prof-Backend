const express = require('express');
const router = express.Router();
const {
  getAllPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
  addSSVMeasurement,
  addMLPrediction
} = require('../controllers/patientController');

// Patient CRUD routes
router.route('/')
  .get(getAllPatients)
  .post(createPatient);

router.route('/:id')
  .get(getPatient)
  .put(updatePatient)
  .delete(deletePatient);

// SSV Measurement route
router.post('/:id/ssv', addSSVMeasurement);

// ML Prediction route
router.post('/:id/prediction', addMLPrediction);

module.exports = router;
