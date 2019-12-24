CREATE DATABASE gaoutcomes;

\c gaoutcomes;

CREATE TABLE students (id SERIAL, name VARCHAR(32), course VARCHAR(32), cohort VARCHAR(32));

INSERT INTO students (name, course, cohort) VALUES
('Meredith', 'Software Engineering Immersive', 'Avocado Toast'),
('Justin', 'Software Engineering Immersive', 'Peanut Butter'),
('Richard', 'Software Engineering Immersive', 'Avocado Toast'),
('Wincy', 'Software Engineering Immersive', 'Avocado Toast');
