const express = require('express');
const cors = require('cors');
const fs = require('fs');

const dataPhones = fs.readFileSync('./api/phones.json');
const phones = JSON.parse(dataPhones);

const app = express();

app.use(cors());

const PORT = 4000;

app.get('/api/phones', (req, res) => {
  res.json(phones);
});

app.listen(PORT);
