const userSchemas = require('../schemas/userSchemas');
const usersRepository = require('../repositories/usersRepository');
const sessionsRepository = require('../repositories/sessionsRepository');


async function postSignUp(req, res) {
    const userParams = req.body;
  
    const { error } = userSchemas.signUp.validate(userParams);
    if (error) return res.status(422).send({ error: error.details[0].message });
  
    if (await usersRepository.isEmailUnique(userParams.email) ) {
      return res.status(409).json({ error: "Email já está em uso" });
    }
  
    const user = await usersRepository.create(userParams);
    
    const userData = getUserData(user);
  
    return res.status(201).send(userData);
}

async function postSignIn(req, res) {

    const userParams = req.body;
  
    const { error } = userSchemas.signIn.validate(userParams);
    if (error) return res.status(422).send({ error: error.details[0].message });
  
    const user = await usersRepository.findByEmailAndPassword(
      userParams.email,
      userParams.password
    );
    
    if (!user) return res.status(401).send({ error: "Email ou senha errados!" });
  
    const session = await sessionsRepository.createByUserId(user.id);
  
    const userData = getUserData(user);
  
    return res.send({ ...userData, token: session.token }).status(200);
   
}


function getUserData(user) {
    const { username, email, password } = user;

    return {
        username,
        email,
        password
    };
}





module.exports = {
    postSignUp,
    postSignIn
  };