// backend/server.js

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3001; // We'll run the backend on port 3001

// Middleware to enable CORS and parse JSON bodies
app.use(cors());
app.use(express.json());

/**
 * @route   POST /api/getdata
 * @desc    Acts as a proxy to fetch data from the external API.
 * The React app will send a request here.
 */
app.post('/api/getdata', async (req, res) => {
  try {
    // The credentials required by the external API
    const apiCredentials = {
      username: "test",
      password: "123456"
    };

    const apiUrl = 'https://backend.jotish.in/backend_dev/gettabledata.php';

    // Making the POST request to the external API
    const response = await axios.post(apiUrl, apiCredentials);

    // Sending the data received from the external API back to our React app
    res.json(response.data);

  } catch (error) {
    console.error('Error fetching data from external API:', error.message);
    res.status(500).json({ message: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
});