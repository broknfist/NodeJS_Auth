const express = require('express');
const router = express.Router();
const { query } = require('../module/db');

router.get('/', (req, res, next) => {
    res.render('contact', { title: 'Kapcsolat', success: null, error: null });
});

router.post('/', async (req, res, next) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.render('contact', {
                title: 'Kapcsolat',
                success: null,
                error: 'Kérjük, töltse ki az összes kötelező mezőt!'
            });
        }

        const sql = `
            INSERT INTO messages (name, email, subject, message)
            VALUES (?, ?, ?, ?)
        `;

        await query(sql, [name, email, subject || '', message]);

        res.render('contact', {
            title: 'Kapcsolat',
            success: 'Üzenetét sikeresen elküldtük! Hamarosan felvesszük Önnel a kapcsolatot.',
            error: null
        });
    } catch (error) {
        console.error('Contact form error:', error);
        res.render('contact', {
            title: 'Kapcsolat',
            success: null,
            error: 'Hiba történt az üzenet küldése során. Kérjük, próbálja újra később!'
        });
    }
});

module.exports = router;

