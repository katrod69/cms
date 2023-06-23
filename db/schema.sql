DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
    id iNT NOT NULL AUTO_INCREMENT,
    name varchar(30),
    primary key (id)
);

CREATE TABLE roles(
    id INT NOT NULL ,
    title varchar (30),
    salary decimal,
    department_id int,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
   id INT NOT NULL ,
   first_name varchar (30),
   last_name varchar (30),
   role_id INT,
   manager_id INT,
   FOREIGN KEY (role_id) REFERENCES roles(id),
   FOREIGN KEY (manager_id) REFERENCES employee(id)
);





