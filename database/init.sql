CREATE DATABASE IF NOT EXISTS progetto_tdp;

USE progetto_tdp;

CREATE USER 'utente_db'@'%' IDENTIFIED BY 'Ciao1234oaiC';

GRANT ALL PRIVILEGES ON progetto_tdp.* TO 'utente_db'@'%';

FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS users (
    displayname VARCHAR(32) NOT NULL,
    username VARCHAR(32) NOT NULL,
    password CHAR(255) NOT NULL,
    lastlogin TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    role ENUM('admin', 'writer', 'user') NOT NULL
)

