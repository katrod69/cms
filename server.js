// const express = require('express');
const connection = require("./db/connection.js")
const inquirer = require('inquirer')

// const PORT = process.env.PORT || 3306;
// const app = express();

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// // // middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());


const mainView = () =>{

    inquirer
    .prompt({
      name: "start",
      type: "list",
      message: "What would you like to do",
      choices: [
        "View All Departments", 
        "Add a Department", 
        "View All Employees", 
        "Add an Employee", 
        "View All Roles", 
        "Add a Role",  
        "Exit", 
      ],
    })
    .then((answers) => {
      switch (answers.start) {
      case "View All Employees":
        Viewallemployees();
        break;
            case "Add an Employee":
              Addanemployee();
              break;
                case "Update Employee Role":
                  Employeerole();
                  break;
                    case "View All Roles":
                      Viewallroles();
                      break;
                      case "Add a Role":
                        Addarole();
                      break;
                      case "View All Departments":
                        Viewalldepartments();
                      break;
                      case "Add a Department":
                        Addadepartment();
                      break;
                      case "Exit":
                        Exit();
                        break;
      }
    });
  };

  async function Viewalldepartments() {
    const query = `SELECT 
      department.id, 
      department.name FROM 
      department;`;
  
    try {
      const data = await new Promise((resolve, reject) => {
        connection.query(query, (err, data) => {
          if (err) reject(err);
          resolve(data);
        });
      });
  
      console.table(data);
      mainView();
    } catch (err) {
      throw err;
    }
  }
  

  async function Viewallroles() {
  const query = `SELECT
    roles.id,
    roles.title,
    roles.salary,
    department.name AS department
    FROM role
    LEFT JOIN department ON
    role.department_id = department.id;`;

  try {
    const data = await new Promise((resolve, reject) => {
      connection.query(query, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });

    console.table(data);
    mainView();
  } catch (err) {
    throw err;
  }
}

    
  async function Viewallemployees() {
  const query = `SELECT
    employee.id,
    employee.first_name,
    employee.last_name,
    role.title,
    department.name AS department,
    role.salary,
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON manager.id = employee.manager_id;`;

  try {
    const data = await new Promise((resolve, reject) => {
      connection.query(query, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });

    console.table(data);
    mainView();
  } catch (err) {
    throw err;
  }
}

  

     async function Addadepartment() {
      try {
        const data = await inquirer.prompt([
          {
            type: 'input',
            name: 'name',
            message: 'Input New Department Name'
          }
        ]);
    
        const { name } = data;
    
        await new Promise((resolve, reject) => {
          connection.query(`INSERT INTO department (name) VALUES(?)`, [name], (err, res) => {
            if (err) reject(err);
            else resolve(res);
          });
        });
    
        console.log(`Department ${name} added successfully.`);
      } catch (err) {
        console.error(err);
      }
    }
    
    async function Addarole() {
      try {
        const query = `SELECT department.name FROM department`;
    
        const data = await new Promise((resolve, reject) => {
          connection.query(query, (err, data) => {
            if (err) reject(err);
            else resolve(data);
          });
        });
    
        const departments = data.map((item) => `${item.name}`);
    
        const userInput = await inquirer.prompt([
          {
            type: "input",
            name: "title",
            message: "What is the title of the role?",
          },
          {
            type: "input",
            name: "salary",
            message: "What is the salary of the role?",
          },
          {
            type: "list",
            name: "department_name",
            message: "What is the department of the role?",
            choices: [...departments],
          },
        ]);
    
        const { title, salary, department_name } = userInput;
    
        await new Promise((resolve, reject) => {
          connection.query(
            `INSERT INTO role (title, salary, department_id)
              SELECT ?, ?, department.id
              FROM department
              WHERE department.name = ?`,
            [title, salary, department_name],
            (err, res) => {
              if (err) reject(err);
              else resolve(res);
            }
          );
        });
    
        console.log(`\n-------------------\n Role ${title} has been added!\n`);
        Viewallroles();
      } catch (err) {
        console.error(err);
      }
    }
    

  

  async function Addanemployee() {
  try {
    let userInput1;

    const rolesData = await new Promise((resolve, reject) => {
      const query = `SELECT id, title FROM role WHERE title NOT LIKE '%Manager%';`;
      connection.query(query, (err, data) => {
        if (err) throw (err);
        else resolve(data);
      });
    });

    const roles = rolesData.map(
      (item) => `Role title: ${item.title}, Role ID: ${item.id}`
    );

    const answer = await inquirer.prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "role",
        type: "list",
        message: "What is the employee's role id?",
        choices: roles,
      },
    ]);

    userInput1 = answer;

    const managersData = await new Promise((resolve, reject) => {
      const query = `SELECT 
        manager.id as manager_id,
        CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN employee AS manager ON manager.id = employee.manager_id 
        WHERE manager.id IS NOT NULL
        GROUP BY manager_id;`;

      connection.query(query, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });

    const managers = managersData.map(
      (item) => `${item.manager_name} ID:${item.manager_id}`
    );

    const managerAnswer = await inquirer.prompt([
      {
        name: "manager",
        type: "list",
        message: "Which manager is the employee under?",
        choices: [...managers, "None"],
      },
    ]);

    const query = `INSERT INTO employee 
      (first_name, last_name, role_id, manager_id) 
      VALUES (?, ?, ?, ?)`;

    await new Promise((resolve, reject) => {
      connection.query(
        query,
        [
          userInput1.first_name,
          userInput1.last_name,
          userInput1.role.split("ID: ")[1],
          managerAnswer.manager.split("ID:")[1],
        ],
        (err, data) => {
          if (err) reject(err);
          else resolve(data);
        }
      );
    });

    console.log(
      `Added ${userInput1.first_name} ${userInput1.last_name} to the database`
    );
    Viewallemployees();
  } catch (error) {
    console.error(error);
  }
}
function Exit() {
  console.log("Goodbye!");
  connection.end();
}

mainView();