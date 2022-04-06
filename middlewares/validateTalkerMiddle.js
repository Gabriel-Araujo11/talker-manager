const UNAUTHORIZED = 401;
const BAD_REQUEST = 400;
const REGEX_DDMMAAAA = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/i;

function validadeTalkerByName(name) {
    if (!name || name === '') {
        return { status: BAD_REQUEST, message: 'O campo "name" é obrigatório' };
    } 

    if (name.length < 3) {
        return { status: BAD_REQUEST, message: 'O "name" deve ter pelo menos 3 caracteres' };
    }
}
    
    function validateTalkerByAge(age) {
        if (!age || age === '') {
         return { status: BAD_REQUEST, message: 'O campo "age" é obrigatório' };
        }

        if (parseInt(age, 10) < 18) {
            return { status: BAD_REQUEST, message: 'A pessoa palestrante deve ser maior de idade' };
        }
    }
    
    function validateWatchedAtRate(watchedAt) {
        if (!REGEX_DDMMAAAA.test(watchedAt)) { 
            return { status: BAD_REQUEST,
                message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' };
        }
    }
    
    function validateRate(rate) {
        const parseIntVar = parseInt(rate, 10);
        if (parseIntVar < 1 || parseIntVar > 5) {
            return { status: BAD_REQUEST, message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
        }
    }

    function validateTalk(talk) {
        if (!talk.watchedAt || talk.rate === undefined) {
            return {
                status: BAD_REQUEST,
              message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' };
            }
        }

        function validateTalkFinal(talk = {}) {
            const { watchedAt, rate } = talk;
            return validateTalk(talk)
            || validateWatchedAtRate(watchedAt)
            || validateRate(rate);
        }

  function validateToken(authorization) { 
    if (!authorization) {
        return { status: UNAUTHORIZED, message: 'Token não encontrado' };
    }

    if (authorization.length < 16) {
        return { status: UNAUTHORIZED, message: 'Token inválido' };
    }
}

  function validateByAll(authorization, name, age, talk) {
      return validateToken(authorization)
      || validadeTalkerByName(name)
      || validateTalkerByAge(age)
      || validateTalkFinal(talk);
    }

module.exports = { validateByAll, validateToken };