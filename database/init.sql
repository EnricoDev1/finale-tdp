CREATE DATABASE IF NOT EXISTS progetto_tdp;

USE progetto_tdp;

CREATE USER IF NOT EXISTS 'utente_db'@'%' IDENTIFIED BY 'Ciao1234oaiC';

GRANT ALL PRIVILEGES ON progetto_tdp.* TO 'utente_db'@'%';

FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    displayname VARCHAR(32) NOT NULL,
    username VARCHAR(32) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    lastlogin TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    role ENUM('admin', 'writer', 'user') NOT NULL
);

CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title TEXT NOT NULL,
    content LONGTEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    id_author INT DEFAULT NULL,
    FOREIGN KEY (id_author) REFERENCES users(id) ON DELETE SET NULL
);

INSERT INTO users (displayname, username, password, role) VALUES
('Admin', 'admin', 'hashed_password_1', 'admin'),
('Writer1', 'writer1', 'hashed_password_2', 'writer'),
('User1', 'user1', 'hashed_password_3', 'user');

INSERT INTO posts (title, content, id_author) VALUES
('Primo Post', 'Questo è il contenuto del primo post.', 1),
('Secondo Post', '## Contenuto interessante scritto da Writer1.\ntest *test* **test**', 2),
('Terzo Post', 'Un altro contenuto di esempio.', 3);
