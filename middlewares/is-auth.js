const jwt = require('jsonwebtoken');
const httpError = require('../utils/httpError');

module.exports = (req, res, next) => {
    // get authorization
    const auth = req.get('Authorization');
    // chuck out if no auth
    if (!auth) {
        next(new httpError('No authorization', 401));
    }
    // find token in auth header
    // split on ' '[1]
    const token = auth.split(' ')[1];
    // try
    // decode token (jwt.verify)
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_KEY);
    } catch (error) {
        // catch error 500
        next(new httpError('Error with auth', 500));
    }
    // chuck out no decoded token 401
    if (!decodedToken) {
        next(new httpError('Authorization failed', 401));
    }
    // apply userId to req
    req.userId = decodedToken.userId;
    next();
};
