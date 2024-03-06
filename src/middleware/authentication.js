const httpStatus = require('http-status');

const authenticate = (token) => {
    return (req, res, next) => {
        const authToken = req.headers.authorization;

        if (!authToken || authToken !== token) {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' });
        }
        next();
    };
};

module.exports = authenticate;
