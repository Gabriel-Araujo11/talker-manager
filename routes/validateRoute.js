const express = require('express');

const router = express.Router();

const { randomToken } = require('../services/generateToken');

const { emailValidate, passwordValidate } = require('../middlewares/validateLoginMiddle');

const OK = 200;

router.post('/login', emailValidate, passwordValidate, (_req, res) => {
    const randomsToken = randomToken();
    return res.status(OK).json({ token: randomsToken });
});

module.exports = router;