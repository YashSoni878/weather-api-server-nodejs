const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Define a route to fetch weather data
app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
    }

    const apiKey = 'f2d39d41ddde932430f426fab5cdf774';
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(url);
        const weatherData = response.data;
        res.status(200).json(weatherData);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data.message });
        } else {
            res.status(500).json({ error: 'Error fetching weather data' });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
