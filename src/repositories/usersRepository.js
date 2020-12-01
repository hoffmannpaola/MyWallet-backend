const connection = require('../database/index');
const bcrypt = require('bcrypt');

async function create(userParams) {

    try {
      const { username, email, password } = userParams;
  
      const hash = bcrypt.hashSync(password, 10);
     
      const result = await connection.query('INSERT INTO users (username, "email", "password") VALUES ($1, $2, $3) RETURNING *', [username, email, hash]);
  
      const newUser = result.rows[0];
  
      return newUser;
      
    } catch(error) {
      console.log(error);
    }
  
  }

async function isEmailUnique(email) {

    try {

        const result = await connection.query('SELECT * FROM users WHERE email=$1', [ email ]);

        if(result.rows.length !== 0){
            return true;
        } 

    } catch (error) {
        console.log(error);

    }

}

async function findByEmailAndPassword(email, password) {
    let user;
  
    try {
      const result = await connection.query('SELECT * FROM users WHERE email=$1', [ email ]);
  
      if ( result.rows.length !== 0) {
        user = result.rows[0];
  
        if(bcrypt.compareSync(password, user.password)){
          return user; 

        } else {
          return {}
        }
  
      } else {
        return false;
      }
  
    } catch (error) {
      console.log(error);
    }
}

module.exports = {
    create,
    isEmailUnique,
    findByEmailAndPassword

};