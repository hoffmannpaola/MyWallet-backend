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
  
    return res.send(finances).status(200);

}

// {
//     title,
//     coverUrl,
//     content,
//   },
//   {
//     headers: {
//       Authorization: `Bearer ${user.token}`,
//     },
//   },
// )

async function postRegistry(req, res) {
    const postParams = req.body;
    const {value, description, type} = postParams;

    console.log(req.user.userId);

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