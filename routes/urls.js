const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const url = require('../model/urlschema');
const baseUrl = 'http://localhost:8080';
router.post('/shortner', async (req, res) => {
  const today = new Date();
  const longUrl = req.body.longUrl;
  console.log(longUrl);
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('Invalid Base Url');
  }
  const urlCode = shortid.generate();
  if (validUrl.isUri(longUrl)) {
    try {
      let url_request = await url.findOne({ longUrl: longUrl });

      if (url_request) {
        res.json(url_request);
      } else {
        const shortUrl = baseUrl + '/' + urlCode;
        url_request = new url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });

        res.json(url_request);
        await url_request.save();
      }
    } catch (err) {
      console.err(err);
      res.status(500).json('Error occured' + err);
    }
  } else {
    res.status(401).json('Invalid Long URL');
  }
});
module.exports = router;
