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

async function create(registry) {
    const { idUser, date, description, value, type } = registry;

    let newRegistry;

    try {
        const result = await connection.query('INSERT INTO finances ("idUser", date, description, value, type) VALUES ($1, $2, $3, $4, $5) RETURNING *', [idUser, date, description, value, type]);

        newRegistry = result.rows[0]

    } catch(error) {
        console.log(error);
    }

    return newRegistry;
}

module.exports = {
    findFinancesByUser,
    create

};