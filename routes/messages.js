const express = require('express');
const router = express.Router();
const { query } = require('../module/db');
const { checkRegistered } = require('../module/auth');

router.get('/', checkRegistered, async (req, res, next) => {
    try {
        const messages = await query(`
            SELECT * FROM messages 
            ORDER BY created_at DESC
        `);

        res.render('messages', {
            title: 'Üzenetek',
            messages
        });
    } catch (error) {
        console.error('Messages error:', error);
        res.render('messages', {
            title: 'Üzenetek',
            messages: [],
            error: 'Hiba történt az üzenetek betöltése során.'
        });
    }
});

module.exports = router;

