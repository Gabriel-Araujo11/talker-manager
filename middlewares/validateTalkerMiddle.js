const REGEX_DDMMAAAA = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/i;

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
    
    function validateWatchedAtRate(watchedAt, rate) {
        if (!REGEX_DDMMAAAA.test(watchedAt)) { 
            return { message: 'O campo "WatchedAt" deve ter o formato "dd/mm/aaaa"' };
        }

        if (!Number.isInteger(rate) || rate < 0 || rate > 5) {
            // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
            return { message: 'O campo "rate" deve ser um inteiro de 1 à 5' };
          }
        }

    function validateTalk(talk) {
        if (!talk || !talk.watchedAt || !talk.rate) {
        return {
             message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' };
    }
    const message = validateWatchedAtRate(talk.watchedAt, talk.rate);
    if (message) {
      return message;
    }
  }

  function validateByAll(t) {
      let messageFinal = validadeTalkerByName(t.name);
      if (messageFinal) {
          return messageFinal;
      }

      messageFinal = validateTalkerByAge(t.age);
      if (messageFinal) {
          return messageFinal;
      }
      messageFinal = validateTalk(t.talk);
      return messageFinal;
      }

module.exports = { validateByAll };