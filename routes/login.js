const express = require('express');
const router = express.Router();
const { query } = require('../module/db');
const { genPassword } = require('../module/auth');

router.get('/', (req, res, next) => {
    res.render('login', { title: 'Bejelentkezés', error: null });
});

router.post('/', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const sql = `
            SELECT * FROM users
            WHERE username = ?
            AND hash = ?
        `;

        const users = await query(sql, [username, genPassword(password)]);
        if (users.length === 1) {
            req.session.user = users[0];
            res.redirect('/app148/');
        } else {
            res.render('login', { title: 'Bejelentkezés', error: 'Hibás felhasználónév vagy jelszó!' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.render('login', { title: 'Bejelentkezés', error: 'Hiba történt a bejelentkezés során!' });
    }
});

module.exports = router;

