const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Predefined API key
const RAPIDAPI_KEY = 'Qin9902wJRmshsTE54XUIARXzJqbp1JjOD8jsnrGlWi9N1m6jO';

app.use(cors());
app.use(express.json());

app.get('/api/reels/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const response = await axios.get(`https://instagram-scraper-2022.p.rapidapi.com/ig/reels_posts/?id_user=${userId}`, {
            headers: {
                'x-rapidapi-key': RAPIDAPI_KEY,
                'x-rapidapi-host': 'instagram-scraper-2022.p.rapidapi.com'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        if (error.response) {
            res.status(error.response.status).send(error.response.data);
        } else {
            res.status(500).send('Error fetching data from Instagram API');
        }
    }
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
