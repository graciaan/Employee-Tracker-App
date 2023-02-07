const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

//creates connection to mysql database and sets it as a constant that can be used throughout the code
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employees_db'
  }
);

//opening function that acts as the main menu for the user to navigate through
function promptCreator(){
  inquirer.prompt(
    [
      {
        name: "employeeTracker",
        message: "Hello and welcome to the Employee Tracker Database, please make a selection from the following choices: ",
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add A Department", "Add A Role", "Add An Employee", "Update An Employee", "Finished"],
        type: "list"
      }
    ]
  )
  //guides the menu as to which function to run based on user selection
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
    } else if (`${data.employeeTracker}` === "Update An Employee") {
      return updateEmployee(); 
    } else {
      db.end();
    };
  });
};

//shows user the list of departments in the database
function viewDepartments() {
  db.query(`SELECT * FROM department`, (err, results) => {
    err ? console.error(err) : console.table(results);
    promptCreator();
  });
};

//shows the user the list of roles in the database
function viewRoles() {
  db.query(`SELECT * FROM role`, (err, results) => {
    err ? console.error(err) : console.table(results);
    promptCreator();
  });
};

//shows the user the list of employees in the database
function viewEmployees() {
  db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id`, (err, results) => {
    err ? console.error(err) : console.table(results);
    promptCreator();
  });
};

//function that allows the user to add a new department to the database. the id # will auto increment
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

//function that allows the user to add a new role to the database. the id # will auto increment
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

//function that allows the user to add a new employee to the database. id will auto increment
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

//function that allows the user to update the employees current role
function updateEmployee() {
  db.query(`SELECT * FROM employee`, (err, results) => {
    const employeeList = [];
    results.forEach(({ first_name, last_name, id }) => {
      employeeList.push({
        name: first_name + " " + last_name,
        value: id
      });
    });
    db.query(`SELECT  * FROM role`, (err, roleResults) => {
      err ? console.error(err) : console.table(results);
      const roleList = [];
      roleResults.forEach(({ title, id }) => {
        roleList.push({
          name: title,
          value: id
        });
      });
      inquirer.prompt(
        [
          {
            name: "employeeSelect",
            message: "Please Select the Employee You Wish to Update.",
            choices: employeeList,
            type: "list"
          },
          {
            name: "roleSelect",
            message: "Please Select the New Role for this Employee.",
            choices: roleList,
            type: "list"
          }
        ]
      )
      .then(function(data) {
        db.query(`UPDATE employee SET ? WHERE ?? = ?`, [{role_id: data.roleSelect}, "id", data.employeeSelect], 
        err ? console.error(err) : console.table(results));
        promptCreator();
      })      
    })
  })
}

promptCreator();