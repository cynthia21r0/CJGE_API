-- POSTGRESQL
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    lastname VARCHAR(250),
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(250) NOT NULL,
    priority bool NOT NULL,
    user_id INTEGER REFERENCES users(id)
);

-- Insertar 1 usuario
INSERT INTO users (name, lastname) VALUES ('Cynthia', 'Granados');

-- Insertar 2 tareas
INSERT INTO tasks (name, description, priority, user_id)
VALUES ('Tarea 1', 'Descripción de la tarea 1', true, 1);

INSERT INTO tasks (name, description, priority, user_id)
VALUES ('Tarea 2', 'Descripción de la tarea 2', true, 1);