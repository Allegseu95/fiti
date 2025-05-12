const express = require('express');
const path = require('path');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (_, res) => {
  res.send('Server running successfully!');
});

app.post('/get-height-of-page', async (req, res) => {
  try {
    const { url, width, height, userAgent } = req.body;

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setUserAgent(userAgent);
    await page.setViewport({ width, height });
    await page.goto(url, { waitUntil: 'networkidle0' });

    const _height = await page.evaluate(
      () => document.documentElement.scrollHeight
    );

    await browser.close();

    res.status(200).json({ height: _height, success: true });
  } catch (error) {
    console.error('Error calculating height:', error);
    res.status(500).json({ error: 'Failed', success: false });
  }
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log(`🚀 Server running on port http://localhost:${app.get('port')}`);
});
