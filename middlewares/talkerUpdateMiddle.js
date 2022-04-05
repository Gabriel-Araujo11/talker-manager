const OK = 200;
const fs = require('fs').promises;

async function talkerUpdate(req, res) {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talkers = JSON.parse(await fs.readFile('./talker.json'));
    const reTalkers = talkers.filter((t) => Number(t.id) !== Number(id));
    const talkerUpdated = {
        id: Number(id),
        name, 
        age, 
        talk,
    };

    const newTalkers = [...reTalkers, talkerUpdated];
    await fs.writeFile('./talker.json', JSON.stringify(newTalkers));
    return res.status(OK).json(newTalkers);
}

module.exports = talkerUpdate;