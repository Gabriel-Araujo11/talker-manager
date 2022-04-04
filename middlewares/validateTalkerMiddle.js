function validadeTalkerByName(name) {
    if (!name || name === '') {
        return { message: 'O campo "name" é obrigatório' };
    } 

    if (name.length < 3) {
        return { message: 'O "name" deve ter pelo menos 3 caracteres' };
    }
}
    
    function validateTalkerByAge(age) {
        if (age || age === '') {
         return { message: 'O campo "age" é obrigatório' };
        }

        if (parseInt(age, 10) < 18) {
            return { message: 'A pessoa palestrante deve ser maior de idade' };
        }
    }
    
module.exports = { validadeTalkerByName, validateTalkerByAge };