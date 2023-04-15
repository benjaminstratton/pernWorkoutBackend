CREATE DATABASE workout_api;

-- Download Extension "uuid-ossp"
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Users table
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    user_sex VARCHAR(1),
    user_height INT DEFAULT 66
);

-- Insert test users (test)
INSERT INTO users (user_name, user_email, user_password, date_of_birth, user_sex, user_height)
VALUES
('SoggyJake', 'soggymuffin@gmail.com', 'Benisbigger123!', '1999-12-19', 'M', 68),
('Brorito', 'jalenrojas@gmail.com', 'Bentley123!', '2001-08-09', 'M', 66);


CREATE TABLE runs (
    run_id SERIAL PRIMARY KEY,
    user_id UUID,
    date DATE NOT NULL,
    distance INT NOT NULL,
    time INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO runs (user_id, date, distance, time)
VALUES 
('<UUID>', '2023-04-10', 3, 18),
('<UUID>', '2023-04-11', 4, 26);

-- Test Join (test)
SELECT * FROM users AS u LEFT JOIN runs AS r ON u.user_id = r.user_id WHERE u.user_id = '<UUID>';





-- Can't get below to work with react, so it is not being added for now
-- Create Workout Log table
CREATE TABLE workout_log(
    workout_id SERIAL PRIMARY KEY,
    user_id UUID,
    log_title TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Create Exercise table
CREATE TABLE exercise(
    ex_id SERIAL PRIMARY KEY,
    workout_id SERIAL,
    ex_name VARCHAR(50),
    sets INT,
    weight INT [],
    reps INT [],
    FOREIGN KEY (workout_id) REFERENCES workout_log(workout_id) on DELETE Cascade
);

-- Insert test data (test)
INSERT INTO workout_log(user_id, log_title)
VALUES
('<UUID>', 'Monday, June 10th'),
('<UUID>', 'Tuesday, June 11th');

INSERT INTO exercise(workout_id, ex_name, sets, weight, reps)
VALUES
(3, 'Deadlift', 4, '{315, 315, 315, 315}', '{8, 8, 8, 8}'),
(3, 'Lat Pulldown', 3, '{180, 180, 180}', '{10, 10, 10}'),
(4, 'Bench Press', 3, '{225, 225, 225}', '{6, 6, 6}'),
(4, 'Dips', 3, '{25, 25, 25}', '{8, 8, 8}');

-- Testing Join (test)
SELECT * FROM users AS u LEFT JOIN workout_log AS w ON u.user_id = w.user_id LEFT JOIN exercise AS e ON e.workout_id = w.workout_id WHERE u.user_id = '<UUID>';

SELECT * FROM workout_log AS w LEFT JOIN exercise AS e ON w.workout_id = e.workout_id WHERE w.user_id = '<UUID>';