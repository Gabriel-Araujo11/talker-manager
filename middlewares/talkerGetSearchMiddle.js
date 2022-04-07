const OK = 200;
const fs = require('fs').promises;

async function talkerGetSearch(req, res) {
    const { q } = req.query;
    console.log(q);

    try {
        const talkers = await fs.readFile('./talker.json');
        const talkersParse = JSON.parse(talkers);
        
        const talkersFilter = talkersParse.filter((t) => t.name.includes(q));
        if (q !== null) {
            return res.status(OK).json(talkersFilter);
        }
        
        if (q.length === 0) {
            return res.status(OK).json([]);
        }
    } catch (error) {
        return res.status(401).json(console.log(error));
    }
}

module.exports = talkerGetSearch;