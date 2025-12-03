const express = require('express');
const router = express.Router();

const { query } = require('../module/db');
const { genPassword } = require('../module/auth');

router.get('/', (req, res, next) => {
    res.render('login', { title: 'Login' });
});

router.post('/', async (req, res, next) => {
    const { username, password } = req.body;
    const sql = `
        SELECT * FROM users
        WHERE username='${username}'
        AND hash='${genPassword(password)}'
    `;

    const users = await query(sql);
    if (users.length === 1) {
        req.session.user = users[0];
        res.redirect('/');
    } else {
        res.redirect('/login');
    }

});

module.exports = router;
