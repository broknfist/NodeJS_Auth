const express = require('express');
const router = express.Router();
const { query } = require('../module/db');
const { checkAdmin } = require('../module/auth');

router.get('/', checkAdmin, async (req, res, next) => {
    try {
        const products = await query('SELECT * FROM products ORDER BY id');
        res.render('crud', {
            title: 'CRUD - Termékek',
            products,
            editing: null,
            query: req.query
        });
    } catch (error) {
        console.error('CRUD list error:', error);
        res.render('crud', {
            title: 'CRUD - Termékek',
            products: [],
            editing: null,
            error: 'Hiba történt az adatok betöltése során.',
            query: req.query
        });
    }
});

router.post('/create', checkAdmin, async (req, res, next) => {
    try {
        const { name, description, price, stock } = req.body;
        
        if (!name || !price) {
            return res.redirect('/crud?error=Kérjük töltse ki a kötelező mezőket!');
        }

        await query(
            'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)',
            [name, description || '', parseFloat(price), parseInt(stock) || 0]
        );

        res.redirect('/crud?success=Termék sikeresen létrehozva!');
    } catch (error) {
        console.error('CRUD create error:', error);
        res.redirect('/crud?error=Hiba történt a termék létrehozása során!');
    }
});

router.get('/edit/:id', checkAdmin, async (req, res, next) => {
    try {
        const productId = req.params.id;
        const products = await query('SELECT * FROM products ORDER BY id');
        const editing = await query('SELECT * FROM products WHERE id = ?', [productId]);

        if (editing.length === 0) {
            return res.redirect('/crud?error=Termék nem található!');
        }

        res.render('crud', {
            title: 'CRUD - Termékek',
            products,
            editing: editing[0],
            query: req.query
        });
    } catch (error) {
        console.error('CRUD edit error:', error);
        res.redirect('/crud?error=Hiba történt a termék betöltése során!');
    }
});

router.post('/update/:id', checkAdmin, async (req, res, next) => {
    try {
        const productId = req.params.id;
        const { name, description, price, stock } = req.body;

        if (!name || !price) {
            return res.redirect('/crud?error=Kérjük töltse ki a kötelező mezőket!');
        }

        await query(
            'UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ?',
            [name, description || '', parseFloat(price), parseInt(stock) || 0, productId]
        );

        res.redirect('/crud?success=Termék sikeresen frissítve!');
    } catch (error) {
        console.error('CRUD update error:', error);
        res.redirect('/crud?error=Hiba történt a termék frissítése során!');
    }
});

router.post('/delete/:id', checkAdmin, async (req, res, next) => {
    try {
        const productId = req.params.id;
        await query('DELETE FROM products WHERE id = ?', [productId]);
        res.redirect('/crud?success=Termék sikeresen törölve!');
    } catch (error) {
        console.error('CRUD delete error:', error);
        res.redirect('/crud?error=Hiba történt a termék törlése során!');
    }
});

module.exports = router;

