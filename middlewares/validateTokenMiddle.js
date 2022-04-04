const UNAUTHORIZED = 401;
const fs = require('fs').promises;

async function validadeToken(req, res, next) {
    const { authorization } = req.headers;
    const token = await fs.readFile('./talker.json');

    if (!authorization || authorization === '') {
        return res.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });
    }

    if (authorization !== token) {
        return res.status(UNAUTHORIZED).json({ message: 'Token inválido' });
    }

    next();
}

module.exports = validadeToken;