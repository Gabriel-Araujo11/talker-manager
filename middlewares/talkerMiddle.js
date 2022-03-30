const fs = require('fs').promises;

async function getTalker() {
// Variável que lê de forma assincrona o conteúdo do arquivo .json; 
    const fileJson = await fs.readFile('./talker.json');
// Variável que transforma o arquivo .json lido pela 'fileJson' e constrói um valor/objeto;
    const fileParse = JSON.parse(fileJson);
// retorna o valor 'pronto' e envia para o Router;
    return fileParse;
}

module.exports = getTalker;