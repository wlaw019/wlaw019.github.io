CREATE DATABASE gaoutcomes;

\c gaoutcomes;

DROP TABLE students;

CREATE TABLE students (id SERIAL, name VARCHAR(32), course VARCHAR(32), cohort VARCHAR(32), dateoffer timestamp);

INSERT INTO students (name, course, cohort) VALUES
('Meredith', 'Software Engineering Immersive', 'Avocado Toast'),
('Justin', 'Software Engineering Immersive', 'Peanut Butter'),
('Richard', 'Software Engineering Immersive', 'Avocado Toast'),
('Wincy', 'Software Engineering Immersive', 'Avocado Toast');

DROP TABLE courses;

CREATE TABLE courses (id SERIAL, course VARCHAR(32), cohort VARCHAR(32), dategraduated timestamp);

INSERT INTO courses (course, cohort) VALUES
('Software Engineering Immersive', 'Avocado Toast'),
('Software Engineering Immersive', 'Peanut Butter');
