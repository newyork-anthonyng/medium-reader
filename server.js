const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
/*
 * 'axios' is used as HTTP client (https://github.com/mzabriskie/axios)
 * 'cheerio' is used to scrape HTML
 */
const axios = require('axios');
const cheerio = require('cheerio');

const { verifyMediumLink } = require('./src/utility/utility.js');

app.use(cors());
app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.get('/medium', (req, res) => {
  // Get link from query string
  const mediumLink = verifyMediumLink(req.query.mediumLink);

  axios({
    url: mediumLink,
    headers: {
      Accept: 'text/html',
    },
  })
    .then((response) => {
      /*
       * Scrape the main content from the Medium article
       * Currently, the main article content is inside <div class="postArticle-content" />
       */
      const $ = cheerio.load(response.data);
      const articleContent = $('.postArticle-content').text();

      res.json({ ok: true, data: articleContent });
    })
    .catch((err) => {
      console.error(err);
    });
});

const server = app.listen(process.env.PORT || 3000, () => {
  const port = server.address().port;
  console.log(`Server running on ${port}`);
});
