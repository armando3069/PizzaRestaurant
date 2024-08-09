const express = require('express');
const router = express.Router();

router.get('/menu', (req, res) => {
  const menu = require('../data/data.json')
    res.json(menu);
  });
  