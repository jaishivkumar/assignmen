// database.js
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'user'
});

connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

function query(sql, args) {
  return new Promise((resolve, reject) => {
    connection.query(sql, args, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = query;
