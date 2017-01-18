const express = require('express');
const request = require('request');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 3000;
const SCRAPE_URL = 'http://new.theastrologer.com/';

app.use(express.static('public'))

function scrapePage(sign, callback) {
  request(`${SCRAPE_URL}/${sign}`, function (err, res, body) {
    return callback(body);
  });
}

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

app.get('/api/:sign', function (req, res) {
  let sign = req.params.sign;
  scrapePage(sign, function (body) {
    let $ = cheerio.load(body);
    let today = $('#today > p').text();

    res.send(today);
  });
});

app.listen(PORT, function () {
  console.log(`App running on http://localhost:${PORT}`);
});
