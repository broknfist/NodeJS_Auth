const express = require('express');
const router = express.Router();

const { query } = require('../module/db');
const { genPassword } = require('../module/auth');

router.get('/', (req, res, next) => {
    res.render('register', { title: 'Register' });
});

router.post('/', async (req, res, next) => {
    const { username, password } = req.body;
    const sql = `
        INSERT INTO users (username, hash, role)
        VALUES ('${username}', '${genPassword(password)}', 'registered')`;
    await query(sql);

    res.send('register sent');
});

module.exports = router;
