const mysql = require('mysql2');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT
});

connection.connect((err) => {
  if(err) {
    console.log(err.message);
  }
  console.log('Database ' + connection.state);
});


class dbOperation {
  static getDbOperation() {
    return instance ? instance : new dbOperation();
  }

  async getTableData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = 'SELECT * FROM BBY7_user;';

        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        })
      });
      return response;

    } catch (err) {
      console.log(err);
    }
  }

  async insertName (fullname) {
    try {
      const insertId = await new Promise((resolve, reject) => {
        const query = 'INSERT INTO BBY7_user (fullname) VALUES (?);';

        connection.query(query, [fullname], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results.insertId);
        })
      });
      return {
        ID : insertId,
        fullname : fullname
      };
    } catch(err) {
      console.log(err);
    }
  }

  async deleteUser(ID) {
    console.log('ID received by DB: ' + ID);
    try {
        ID = parseInt(ID, 10); 
        const response = await new Promise((resolve, reject) => {
            
            const query = "DELETE FROM BBY7_user WHERE ID = ?";

            connection.query(query, [ID] , (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        return response === 1 ? true : false;
    } catch (err) {
        console.log(err);
        return false;
    }
  }


}

module.exports = dbOperation;