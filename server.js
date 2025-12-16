// server.js
// Simple Node.js backend proxy for News Hub News API

const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cors = require('cors');

const app = express();
app.use(cors());

const API_KEY = 'YOUR_API_KEY_HERE'; // 🔑 put your real key here

const SOURCES = [
  'derana',
  'hiru',
  'sirasa',
  'lankadeepa',
  'bbc',
  'itn',
  'siyatha'
];

app.get('/news/:source', async (req, res) => {
  const { source } = req.params;

  if (!SOURCES.includes(source)) {
    return res.status(400).json({ error: 'Invalid news source' });
  }

  try {
    const url = `https://api.srihub.store/news/${source}?apikey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
