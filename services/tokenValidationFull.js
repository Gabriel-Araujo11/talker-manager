const UNAUTHORIZED = 401;

function tokenValidation(req, res, next) {
    const { authorization } = req.headers;
    if (authorization === undefined) {
        return res.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });
    }

    if (authorization.length !== 16) {
        return res.status(UNAUTHORIZED).json({ message: 'Token inválido' });
    }
    next();
}

module.exports = tokenValidation;