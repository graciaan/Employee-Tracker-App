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
VALUES ("Andrew", "Gracia", 1, 1),
      ("John", "Doe", 1, 2),
      ("Conor", "Oberst", 2, 3),
      ("Phil", "Elverum", 3, 2),
      ("Noah", "Lennox", 4, 4)

SELECT * FROM employee;