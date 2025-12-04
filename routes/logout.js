const express = require('express');
const router = express.Router();

const { query } = require('../module/db');
const { genPassword } = require('../module/auth');

// GET or POST /logout
router.get('/logout', (req, res) => {
    // 1. Check if a session exists
    if (req.session) {
        // 2. Destroy the session on the server
        req.session.destroy((err) => {
            if (err) {
                // Handle error if session destruction fails
                return res.status(500).send('Could not log out.');
            } else {
                // 3. Optional: Clear the cookie manually (sometimes necessary)
                // res.clearCookie('connect.sid'); // (if that's your cookie name)

                // 4. Redirect the user to the homepage or login page
                res.redirect('/'); 
            }
        });
    } else {
        // If no session exists, just redirect
        res.redirect('/');
    }
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