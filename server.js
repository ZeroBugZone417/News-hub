const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

// 🔑 API KEY
const API_KEY = 'dew_DCRGqA45wSCzrDCMOhWWb1xyd0ozzHUIagMG3Rrx';

// 🌐 Serve frontend
app.use(express.static(path.join(__dirname, 'public')));

// 📰 News API
app.get('/api/news/:source', async (req, res) => {
  try {
    const source = req.params.source;
    const url = `https://api.srihub.store/news/${source}?apikey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// 🚀 Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`✅ App running on port ${PORT}`)
);
