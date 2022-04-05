const fs = require('fs').promises;

const express = require('express');

const router = express.Router();

const { randomToken } = require('../services/generateToken');

const { emailValidate, passwordValidate } = require('../middlewares/validateLoginMiddle');

const { validateByAll } = require('../middlewares/validateTalkerMiddle');

// const { validadeToken } = require('../middlewares/validateTokenMiddle');

const OK = 200;
const CREATED = 201;

router.post('/login', emailValidate, passwordValidate, (_req, res) => {
    const randomsToken = randomToken();
    return res.status(OK).json({ token: randomsToken });
});

router.post('/talker', validateByAll, async (req, res) => {
    const { name, age, talk } = req.body;
    const talkers = JSON.parse(await fs.readFile('./talker.json'));
    const id = talkers.length + 1;
    const result = validateByAll(name, age, talk);
    const newTalker = {
        id, 
        name,
        age,
        talk,
    };

    if (result) {
        return res.status(result.status).send({ message: result.message });
    }
    talkers.push(newTalker);
    await fs.writeFile('./talker.json', JSON.stringify(talkers));
    return res.status(CREATED).send(newTalker); 
});

module.exports = router;