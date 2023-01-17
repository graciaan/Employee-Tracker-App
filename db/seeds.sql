INSERT INTO department (name)
VALUES ("IT"),
      ("Marketing"),
      ("Sales"),
      ("Accounting");

SELECT * FROM department;

INSERT INTO role (title, salary, department_id)
VALUES ("IT Technician", 72000, 1),
      ("IT Manager", 110000, 1),
      ("Copywriter", 68000, 2),
      ("Marketing Manager", 115000, 2),
      ("Sales Rep", 55000, 3),
      ("Sales Manager", 92000, 3),
      ("Accountant", 59000, 4),
      ("Accounting Manager", 98500, 4);

SELECT * FROM role;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Andrew", "Gracia", 2, NULL),
      ("Jeff", "Mangum", 1, 1),
      ("Conor", "Oberst", 8, NULL),
      ("Phil", "Elverum", 7, 3),
      ("Noah", "Lennox", 5, 3);

SELECT * FROM employee;