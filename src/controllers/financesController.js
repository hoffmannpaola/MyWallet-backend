const userSchemas = require('../schemas/userSchemas');
const usersRepository = require('../repositories/usersRepository');
const sessionsRepository = require('../repositories/sessionsRepository');
const financesRepository = require('../repositories/financesRepository');

async function getFinances(req, res) {

    const userToken = req.header('User-Token');
    console.log(userToken)
  
  
    const user = await sessionsRepository.findByToken(
        userToken
    );
    
    console.log(user)
    if (!user) return res.status(401).send({ error: "Usuário não encontrado!" });

  
    const finances = await financesRepository.findFinancesByUser(user.userId);
  
    // const userData = getUserData(user);
  
    return res.send(finances).status(200);
   

}

module.exports = {
    getFinances
};