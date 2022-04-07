const express = require('express');
const fs = require('fs').promises;

const getTalker = require('../middlewares/talkerMiddle');
const getTalkerById = require('../middlewares/talkerByIdMiddle');
const talkerUpdate = require('../middlewares/talkerUpdateMiddle');
const talkerDelete = require('../middlewares/talkerDeleteMiddle');
const tokenValidation = require('../services/tokenValidationFull');
const talkerGetSearch = require('../middlewares/talkerGetSearchMiddle');
const { validateByAll } = require('../middlewares/validateTalkerMiddle');

const router = express.Router();

const OK = 200;
const ERROR = 404;
const CREATED = 201;
// REQ 01 - Pega (get) todos os Talkers; O "_" 'inutiliza' o parametro;
router.get('/', async (_req, res) => {
// Retorna a resposta para o servidor sendo como ok, assincronimcamente esperando a ação do middleware getTalker;
    res.status(OK).send(await getTalker());
});

router.get('/search', tokenValidation, talkerGetSearch);

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

router.post('/', async (req, res) => {
    const { name, age, talk } = req.body;
    const { authorization } = req.headers;
    const talkers = JSON.parse(await fs.readFile('./talker.json'));
    const id = talkers.length + 1;
    const result = validateByAll(authorization, name, age, talk);
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

router.put('/:id', talkerUpdate);
router.delete('/:id', talkerDelete);

module.exports = router;