const express = require('express');
const router = express.Router();
const Url = require('../model/urlschema');
router.get('/:code', (req, res) => {
  Url.findOne({ urlCode: req.params.code })
    .then((url) => {
      if (url) {
        return res.redirect(url.longUrl);
      } else {
        return res.status(404).json('No url found');
      }
    })
    .catch((err) => {
      res.status(500).json('Server error');
    });
});

module.exports = router;
