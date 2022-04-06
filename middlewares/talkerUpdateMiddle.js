const fs = require('fs').promises;

const { validateByAll } = require('./validateTalkerMiddle');

const OK = 200;

async function talkerUpdate(req, res) {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const { authorization } = req.headers;
  let talkers = JSON.parse(await fs.readFile('./talker.json'));
  const result = validateByAll(authorization, name, age, talk);
  const newTalker = {
    id: Number(id),
    name,
    age,
    talk,
  };
  talkers = talkers.filter((t) => t.id !== Number(id));
  if (result) {
    return res.status(result.status).send({ message: result.message });
  }
  talkers.push(newTalker);
  await fs.writeFile('./talker.json', JSON.stringify(talkers));
  return res.status(OK).send(newTalker);
}

module.exports = talkerUpdate;