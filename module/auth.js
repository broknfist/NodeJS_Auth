const crypto = require('crypto');

const genPassword = (password) => {
    return crypto
        .createHash('sha512')
        .update(password)
        .digest('hex');
};

const checkAuth = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

const checkRegistered = (req, res, next) => {
    if (req.session.user && (req.session.user.role === 'registered' || req.session.user.role === 'admin')) {
        next();
    } else {
        res.redirect('/login');
    }
};

const checkAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        next();
    } else {
        res.redirect('/');
    }
};

module.exports = {
    genPassword,
    checkAuth,
    checkRegistered,
    checkAdmin,
};

