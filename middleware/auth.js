const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Retrieve token from Authorization header (format: "Bearer <token>")
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { userId, email }
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token is not valid' });
    }
};
