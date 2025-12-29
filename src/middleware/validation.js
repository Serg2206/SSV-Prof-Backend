// Input validation middleware

// Validate patient data
exports.validatePatientData = (req, res, next) => {
  const { patientId, firstName, lastName, dateOfBirth, gender } = req.body;
  
  const errors = [];
  
  if (!patientId || patientId.trim() === '') {
    errors.push('Patient ID is required');
  }
  
  if (!firstName || firstName.trim() === '') {
    errors.push('First name is required');
  }
  
  if (!lastName || lastName.trim() === '') {
    errors.push('Last name is required');
  }
  
  if (!dateOfBirth) {
    errors.push('Date of birth is required');
  } else if (isNaN(Date.parse(dateOfBirth))) {
    errors.push('Invalid date of birth format');
  }
  
  if (!gender) {
    errors.push('Gender is required');
  } else if (!['male', 'female', 'other'].includes(gender)) {
    errors.push('Gender must be male, female, or other');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors: errors
    });
  }
  
  next();
};

// Validate SSV measurement data
exports.validateSSVMeasurement = (req, res, next) => {
  const { measurementDate, ssvValue } = req.body;
  
  const errors = [];
  
  if (!measurementDate) {
    errors.push('Measurement date is required');
  } else if (isNaN(Date.parse(measurementDate))) {
    errors.push('Invalid measurement date format');
  }
  
  if (ssvValue === undefined || ssvValue === null) {
    errors.push('SSV value is required');
  } else if (typeof ssvValue !== 'number') {
    errors.push('SSV value must be a number');
  } else if (ssvValue < 0 || ssvValue > 100) {
    errors.push('SSV value must be between 0 and 100');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors: errors
    });
  }
  
  next();
};

// Validate ML prediction data
exports.validateMLPrediction = (req, res, next) => {
  const { predictionDate, modelVersion, riskScore, confidence } = req.body;
  
  const errors = [];
  
  if (!predictionDate) {
    errors.push('Prediction date is required');
  } else if (isNaN(Date.parse(predictionDate))) {
    errors.push('Invalid prediction date format');
  }
  
  if (!modelVersion || modelVersion.trim() === '') {
    errors.push('Model version is required');
  }
  
  if (riskScore === undefined || riskScore === null) {
    errors.push('Risk score is required');
  } else if (typeof riskScore !== 'number') {
    errors.push('Risk score must be a number');
  } else if (riskScore < 0 || riskScore > 1) {
    errors.push('Risk score must be between 0 and 1');
  }
  
  if (confidence !== undefined && confidence !== null) {
    if (typeof confidence !== 'number') {
      errors.push('Confidence must be a number');
    } else if (confidence < 0 || confidence > 1) {
      errors.push('Confidence must be between 0 and 1');
    }
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors: errors
    });
  }
  
  next();
};

// Sanitize input to prevent injection attacks
exports.sanitizeInput = (req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        // Remove potential malicious characters
        req.body[key] = req.body[key].replace(/[<>"'&]/g, '');
      }
    });
  }
  next();
};
