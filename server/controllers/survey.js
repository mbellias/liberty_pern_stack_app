const surveySchema = require('../models/survey');

exports.submitSurvey = async (req, res) => {
  try {
    const { name, email, categories } = req.body;

    const survey = await surveySchema.create({
      name,
      email,
      categories,
    });

    res.status(201).json(survey);
  } catch (error) {
    console.error('Error submitting survey:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
