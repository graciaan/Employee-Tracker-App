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

function promptCreator() {
  inquirer.prompt(
    [
      {
        name: "employeeTracker",
        message: "Hello and welcome to the Employee Tracker Database, please make a selection from the following choices: ",
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add A Department", "Add A Role", "Add An Employee", "Update An Employee Role", "Finished"],
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
    } else if (`${data.employeeTracker}` === "Add an Employee") {
      return addEmployee();
    } else if (`${data.employeeTracker}` === "Update An Employee Role") {
      return updateEmployee();
    } else {
      // db.end();
    }
  })
}

// function viewDepartments() {
  
// }


promptCreator();