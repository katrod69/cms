
const mysql = require("mysql2");
require('dotenv').config();

// Connect to database
const connection = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.PORT || 3306
    
  },
  console.log(`Connected to the employee_db database.`)
);

module.exports = connection;
