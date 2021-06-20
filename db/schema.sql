DROP DATABASE IF EXISTS employee_trackerDB;
CREATE database employee_trackerDB;

USE employee_trackerDB;;

CREATE TABLE employees (
    employee_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    role_id  INT NOT NULL,
    manager_id INT NOT NULL,
    PRIMARY KEY (employee_id),
    FOREIGN KEY (role_id) REFERENCES roles(roles_id),
    FOREIGN KEY (manager_id) REFERENCES managers(manager_id),
);

CREATE TABLE roles (
    role_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR NOT NULL,
    salary DECIMAL(10,2),
    department_id  INT NOT NULL,
    PRIMARY KEY (role_id),
    FOREIGN KEY (department_id) REFERENCES departments(department_id),
);

CREATE TABLE departments (
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR NOT NULL,
    budget DECIMAL(20,2),
    PRIMARY KEY (department_id),
);

CREATE TABLE managers (
    manager_id INT NOT NULL AUTO_INCREMENT
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (manager_id),
    FOREIGN KEY (department_id) REFERENCES departments (department_id),
);