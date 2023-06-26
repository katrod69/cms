
INSERT INTO department(name) VALUES
("C-suite"),
("Associates"),
("Janitors");

INSERT INTO roles(title, salary, department_id) VALUES
('CFO', 100000000, 1),
('CEO', 200000000, 1),
('COO', 120000000, 1),
('ASSOCIATE 1', 300, 2),
('ASSOCIATE 2' ,400, 2),
('ASSOCIATE 3', 500, 2),
('JANITOR 1',500, 3),
('JANITOR 1' ,500, 3),
('JANITOR 1' ,500, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES
('stinky', 'Maury', 1, NULL),
('Delorian', 'Timmy', 2, NULL),
('Fawcet', 'Farra', 3, NULL),
('Mouse', 'Mickey', 4, 6),
('Wilkerson', 'Malcolm', 1, NULL),
('mary', 'watson', 5, 8),
('nikko', 'Horace', 6, NULL),
('beans', 'mgee', 7, NULL),
('petey', 'Bond', 8, NULL),
('mark', 'toulouse', 9, 4);

