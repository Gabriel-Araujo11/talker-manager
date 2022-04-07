const OK = 200;
const fs = require('fs').promises;

const talkerGetSearch = async (req, res) => {
    const { query } = req.query.q;
    console.log(query);

    try {
        const talkers = await fs.readFile('./talker.json');
        const talkersParse = JSON.parse(talkers);
        
        const talkersFilter = talkersParse.filter((t) => t.name.includes(query));
        if (!query) {
            return res.status(OK).json(talkersFilter);
        }
        
        if (query.length === 0) {
            return res.status(OK).json([]);
        }
    } catch (error) {
        return res.status(401).json(console.log(error));
    }
};

module.exports = talkerGetSearch;