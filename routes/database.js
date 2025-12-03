const express = require('express');
const router = express.Router();
const { query } = require('../module/db');

router.get('/', async (req, res, next) => {
    try {
        const categories = await query('SELECT * FROM categories ORDER BY id');
        const products = await query('SELECT * FROM products ORDER BY id');
        const orders = await query(`
            SELECT o.*, u.username, p.name as product_name 
            FROM orders o 
            LEFT JOIN users u ON o.user_id = u.id 
            LEFT JOIN products p ON o.product_id = p.id 
            ORDER BY o.id
        `);

        res.render('database', {
            title: 'Adatbázis',
            categories,
            products,
            orders
        });
    } catch (error) {
        console.error('Database error:', error);
        res.render('database', {
            title: 'Adatbázis',
            categories: [],
            products: [],
            orders: [],
            error: 'Hiba történt az adatok betöltése során.'
        });
    }
});

module.exports = router;

