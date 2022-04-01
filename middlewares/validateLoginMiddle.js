const BAD_REQUEST = 400;

function emailValidateRx(email) {
    const rx = /\S+@\S+\.\S+/;
        return rx.test(email);
}

function emailValidate(req, res, next) {
    const { email } = req.body;
    if (!email || email === '') {
        return res.status(BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });
    }
    if (emailValidateRx(email) === false) {
      return res.status(BAD_REQUEST)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    next();
}

function passwordValidate(req, res, next) {
    const { password } = req.body;
    if (!password || password === '') {
        return res.status(BAD_REQUEST)
        .json({ message: 'O campo "password" é obrigatório' });
    }

    if (password.length < 6) {
        return res.status(BAD_REQUEST)
        .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
}

module.exports = { emailValidate, passwordValidate };