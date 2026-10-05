const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
app.use(cors());

app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send('URL required');
  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
        'Referer': 'https://cdn.tsetmc.com/',
        'Origin': 'https://cdn.tsetmc.com'
      }
    });
    res.send(await response.text());
  } catch (e) { res.status(500).send(e.message); }
});

app.listen(process.env.PORT || 3000);
