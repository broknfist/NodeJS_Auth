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



module.exports = {
    genPassword,
    checkAuth,
};
