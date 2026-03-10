-- Create database
CREATE DATABASE taskmanager_db;

USE taskmanager_db;

-- USERS TABLE
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('ADMIN','USER') DEFAULT 'USER'
);

-- TASKS TABLE
CREATE TABLE tasks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('TODO','IN_PROGRESS','DONE') DEFAULT 'TODO',
    priority ENUM('LOW','MEDIUM','HIGH') DEFAULT 'MEDIUM',
    due_date DATETIME,
    created_at DATETIME,
    updated_at DATETIME,
    user_id BIGINT,

    CONSTRAINT fk_task_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);