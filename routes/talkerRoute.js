const express = require('express');

const getTalker = require('../middlewares/talkerMiddle');

const router = express.Router();

const OK = 200;
// Req 01 - Pega (get) todos os Talkers; O "_" 'inutiliza' o parametro;
router.get('/', async (_req, res) => {
// Retorna a resposta para o servidor sendo como ok, assincronimcamente esperando a ação do middleware getTalker;
    res.status(OK).send(await getTalker());
});

module.exports = router;