const userSchemas = require('../schemas/userSchemas');
const usersRepository = require('../repositories/usersRepository');
const sessionsRepository = require('../repositories/sessionsRepository');
const financesRepository = require('../repositories/financesRepository');
const dayjs = require("dayjs");

async function getFinances(req, res) {

    const userToken = req.header('User-Token');
    
    const user = await sessionsRepository.findByToken(
        userToken
    );
    
    if (!user) return res.status(401).send({ error: "Usuário não encontrado!" });

    const finances = await financesRepository.findFinancesByUser(user.userId);
    const financesLimited = finances.slice(0, 9);
    console.log(financesLimited);
  
    return res.send(finances).status(200);

}


async function postRegistry(req, res) {
    const postParams = req.body;
    const {value, description, type} = postParams;

    const newRegistry =  financesRepository.create({
        idUser: req.user.userId,
        date: dayjs().format('DD/MM'),
        description,
        value,
        type
        
      });

      res.status(201).send(newRegistry);

}

module.exports = {
    getFinances,
    postRegistry
};