const express = require('express');
const router = express.Router();
const { checkAdmin } = require('../module/auth');
const { query } = require('../module/db');

router.get('/', checkAdmin, async (req, res, next) => {
    try {
        const userCount = await query('SELECT COUNT(*) as count FROM users');
        const messageCount = await query('SELECT COUNT(*) as count FROM messages');
        const productCount = await query('SELECT COUNT(*) as count FROM products');
        const orderCount = await query('SELECT COUNT(*) as count FROM orders');

        res.render('admin', {
            title: 'Admin Oldal',
            stats: {
                users: userCount[0].count,
                messages: messageCount[0].count,
                products: productCount[0].count,
                orders: orderCount[0].count
            }
        });
    } catch (error) {
        console.error('Admin error:', error);
        res.render('admin', {
            title: 'Admin Oldal',
            stats: {
                users: 0,
                messages: 0,
                products: 0,
                orders: 0
            }
        });
    }
});

module.exports = router;

