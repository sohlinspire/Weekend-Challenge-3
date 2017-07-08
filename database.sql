CREATE TABLE tasks(
	id SERIAL PRIMARY KEY,
	task VARCHAR (100) NOT NULL
);

INSERT INTO tasks (task) VALUES ('Complete To-Do App');
INSERT INTO tasks (task) VALUES ('Tackle Angular');


SELECT * FROM tasks;
