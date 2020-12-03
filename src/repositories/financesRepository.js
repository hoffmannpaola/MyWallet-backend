const connection = require("../database/index");

async function findFinancesByUser(id) {
    let finances;

    try {
      const result = await connection.query('SELECT * FROM finances WHERE  "idUser"= $1', [id]);
  
      finances = result.rows;
      
    }catch (error) {
      console.log(error);
  
    }
    console.log(finances)
    return finances;

}

module.exports = {
    findFinancesByUser

};