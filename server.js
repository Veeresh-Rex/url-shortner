const express = require('express');
const app = express();
var cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
var mongoose = require('mongoose');
const urls = require('./routes/index');
const api = require('./routes/urls');
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(
    process.env.MONGODB_URI ||
      'mongodb+srv://leet-rex:Veer2000@password-auth.uagdt.mongodb.net/url-shortner',
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('mongo is connected ');
  })
  .catch((err) => {
    console.log('There is an error with mongoDb' + err);
  });

app.use('/', urls);
app.use('/url', api);
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
