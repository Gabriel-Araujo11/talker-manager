const fs = require('fs').promises;

async function getTalkerById(id) {
// Variável que lê de forma assincrona o conteúdo do arquivo .json; 
    const fileJson = JSON.parse(await fs.readFile('./talker.json'));

    // filtra a lista por r quando r.id for igual o id que foi passado;    
// Procura na variavel que traz a informação json o id e transforma em número (parseInt - o parametro 10 é recomendado pela documentação: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/parseInt)
    const findById = fileJson.find((r) => r.id === parseInt(id, 10));
// Se o Id não for encontrado, retornará a mensagem descrita. Se for encontrado, retornará o arquivo corretamente;
        if (!findById) return { message: 'Pessoa palestrante não encontrada' }; 
            return findById;
}

module.exports = getTalkerById;