const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employees_db'
  }
);

function promptCreator(){
  inquirer.prompt(
    [
      {
        name: "employeeTracker",
        message: "Hello and welcome to the Employee Tracker Database, please make a selection from the following choices: ",
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add A Department", "Add A Role", "Add An Employee", "Finished"],
        type: "list"
      }
    ]
  )
  .then(function(data){
    if (`${data.employeeTracker}` === "View All Departments") {
      return viewDepartments();
    } else if (`${data.employeeTracker}` === "View All Roles") {
      return viewRoles();
    } else if (`${data.employeeTracker}` === "View All Employees") {
      return viewEmployees();
    } else if (`${data.employeeTracker}` === "Add A Department") {
      return addDepartment();
    } else if (`${data.employeeTracker}` === "Add A Role") {
      return addRole();
    } else if (`${data.employeeTracker}` === "Add An Employee") {
      return addEmployee();
    } else {
      db.end();
    };
  });
};

function viewDepartments() {
  db.query(`SELECT * FROM department`, (err, results) => {
    err ? console.error(err) : console.table(results);
    promptCreator();
  });
};

function viewRoles() {
  db.query(`SELECT * FROM role`, (err, results) => {
    err ? console.error(err) : console.table(results);
    promptCreator();
  });
};

function viewEmployees() {
  db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id`, (err, results) => {
    err ? console.error(err) : console.table(results);
    promptCreator();
  });
};

function addDepartment() {
  inquirer.prompt(
    [
      {
        name: "addDepartment",
        message: "Please Input the Name of the Department You Would Like to Add.",
        type: "input"
      }
    ]
  )
  .then(function(data) {
    db.query(`INSERT INTO department(name) VALUES(?)`, data.addDepartment) 
    promptCreator();
  });
};

function addRole() {
  inquirer.prompt(
    [
      {
        name: "addRole",
        message: "What Role do You Wish to Add?",
        type: "input"
      },
      {
        name: "roleSalary",
        message: "What is the Yearly Salary for the Role?",
        type: "input"
      },
      {
        name: "roleDept",
        message: "What is the Department ID# for this Role? Please select a number: IT-1, Marketing-2, Sales-3, Accounting-4",
        choices: [1,2,3,4],
        type: "list"
      }
    ]
  )
  .then(function(data) {
    db.query(`INSERT INTO role(title, salary, department_id) VALUES (?,?,?)`, [data.addRole, data.roleSalary, data.roleDept])
    promptCreator();
  });
};

function addEmployee() {
  inquirer.prompt(
    [
      {
        name: "employeeFirstName",
        message: "What is the First Name of the Employee?",
        type: "input"
      },
      {
        name: "employeeLastName",
        message: "What is the Last Name of the Employee?",
        type: "input"
      },
      {
        name: "roleID",
        message: "Please Type a Role ID # for the Employee.",
        type: "input"
      },
      {
        name: "managerID",
        message: "Please Type a Manager ID # for the Employee."
      }
    ]
  )
  .then(function(data) {
    db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`, [data.employeeFirstName, data.employeeLastName, data.roleID, data.managerID])
    promptCreator();
  });
};
promptCreator();