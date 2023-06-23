
const mysql = require("mysql2");

// Connect to database
const connection = mysql.createConnection(
  {
    host: "localhost",
    // MySQL Username
    user: process.env.MYSQL_USERNAME,
    // TODO: Add MySQL Password
    password: process.env.MYSQL_PASSWORD,
    database: "employee_db",
      port: 3306
    
  },
  console.log(`Connected to the employee_db database.`)
);

module.exports = connection;
