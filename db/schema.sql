DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
    id iNT NOT NULL AUTO_INCREMENT,
    name varchar(30) NOT NULL,
    primary key (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title varchar (30) NOT NULL,
    salary decimal (10,2) NOT NULL,
    department_id int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
   id INT NOT NULL AUTO_INCREMENT ,
   first_name varchar (30) NOT NULL,
   last_name varchar (30) NOT NULL,
   role_id INT NOT NULL,
   manager_id INT,
   FOREIGN KEY (role_id) REFERENCES role(id),
   FOREIGN KEY (manager_id) REFERENCES employee(id)
);





