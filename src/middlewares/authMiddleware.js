
//const usersRepository = require("../repositories/usersRepository");

async function authMiddleware(req, res, next) {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).send({ error: 'Auth header not found' });

    const token = authHeader.replace('Bearer ', '');

    const user = await usersRepository.findById(session.userId);
    
    if (!user) return res.status(401).json({ error: 'Invalid token' });
  
    req.user = user;
    req.token = token;
  
    next();
}

module.exports = authMiddleware;