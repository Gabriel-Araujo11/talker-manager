const NO_CONTENT = 204;
const fs = require('fs').promises;

const { validateToken } = require('./validateTalkerMiddle');

async function talkerDelete(req, res) {
    const { id } = req.params;
    const { authorization } = req.headers;

    let talkers = JSON.parse(await fs.readFile('./talker.json'));
    const result = validateToken(authorization);    
    console.log(result);

    talkers = talkers.filter((t) => t.id !== Number(id));
    if (result) {
        res.status(result.status).send({ message: result.message });
    }
    await fs.writeFile('./talker.json', JSON.stringify(talkers));
    return res.status(NO_CONTENT).end();
}

module.exports = talkerDelete;