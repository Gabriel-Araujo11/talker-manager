const express = require('express');

const getTalker = require('../middlewares/talkerMiddle');
const getTalkerById = require('../middlewares/talkerByIdMiddle');

const router = express.Router();

const OK = 200;
const ERROR = 404;
// REQ 01 - Pega (get) todos os Talkers; O "_" 'inutiliza' o parametro;
router.get('/', async (_req, res) => {
// Retorna a resposta para o servidor sendo como ok, assincronimcamente esperando a ação do middleware getTalker;
    res.status(OK).send(await getTalker());
});

// REQ 02 - Pega (get) a pessoa palestrante com base no id;
router.get('/:id', async (req, res) => {
// Variável que pega a requisição referente ao parametro requerido (QueryParams); 
    const { id } = req.params;
// Variável que recebe a resolução do middleware executando pelo id;
    const response = await getTalkerById(id);
// Se a resposta não vier com a mensagem do middleware, retornará status OK, tudo certo;
    if (!response.message) {
        return res.status(OK).send(response);
    }
// Se vier com a mensagem que o id não foi encontrado, retornará error 404, enviando (send) a mensagem;
    return res.status(ERROR).send({ message: response.message });
});

    // REQ 04 - POST new talker;

    // router.post('/talker',  )

module.exports = router;