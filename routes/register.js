const express = require('express');
const router = express.Router();
const { query } = require('../module/db');
const { genPassword } = require('../module/auth');

router.get('/', (req, res, next) => {
    res.render('register', { title: 'Regisztráció', error: null });
});

router.post('/', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const sql = `
            INSERT INTO users (username, hash, role)
            VALUES (?, ?, 'registered')`;
        await query(sql, [username, genPassword(password)]);
        res.redirect('/app148/login');
    } catch (error) {
        res.render('register', { title: 'Regisztráció', error: 'A felhasználónév már foglalt!' });
    }
});

module.exports = router;

