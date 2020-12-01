const connection = require("../database/index");
const { v4: uuidv4 } = require("uuid");


async function createByUserId(userId) {
  let newSession;
  const token = uuidv4();

  try {
    const result = await connection.query('INSERT INTO sessions ("userId", token) VALUES ($1, $2) RETURNING *', [userId, token]);

    newSession = result.rows[0];    

  } catch(error){
    console.log(error);

  }

  return newSession;
}

async function findByToken(token) {

  let session;

  try {
    const result = await connection.query('SELECT * FROM sessions WHERE token = $1', [token]);

    session = result.rows[0];
    
  }catch (error) {
    console.log(error);

  }

  return session;
}

async function destroyByUserId(userId) {
  
  try {
      const result = await connection.query('DELETE FROM sessions WHERE "userId"=$1', [userId]);

  } catch(error) {
    console.log(error);
  }

}

module.exports = { 
    createByUserId, 
    findByToken, 
    destroyByUserId 
};