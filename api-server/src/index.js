const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();  // Load environment variables

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Access model endpoint from environment variables
const MODEL_ENDPOINT = process.env.MODEL_ENDPOINT;

// Route to handle prediction requests
app.post('/predict', async (req, res) => {
  try {
    const input = req.body;

    // Forward the request to the ML model
    const response = await axios.post(MODEL_ENDPOINT, input);

    // Send the model's response back to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error making request to ML model:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`API server is running on http://localhost:${port}`);
});
