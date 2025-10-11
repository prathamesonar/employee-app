

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3001; 


app.use(cors());
app.use(express.json());


app.post('/api/getdata', async (req, res) => {
  try {
    // The credentials required by the external API
    const apiCredentials = {
      username: "test",
      password: "123456"
    };

    const apiUrl = 'https://backend.jotish.in/backend_dev/gettabledata.php';

    const response = await axios.post(apiUrl, apiCredentials);

    res.json(response.data);

  } catch (error) {
    console.error('Error fetching data from external API:', error.message);
    res.status(500).json({ message: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(` Backend server running on http://localhost:${PORT}`);
});
