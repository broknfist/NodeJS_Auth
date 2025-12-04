var express = require('express');
var router = express.Router();

const { query } = require('../module/db');

router.get('/', async (req, res, next) => {
  const users = await query('SELECT * FROM users');
  res.render('users', { title: 'Users', users });
});

module.exports = router;
