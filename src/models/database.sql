CREATE DATABASE workout_api;

-- Download Extension "uuid-ossp"
create extension if not exists "uuid-ossp";

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    user_sex VARCHAR(1),
    user_height INT
);

-- Insert fake users (test)
INSERT INTO users (user_name, user_email, user_password, date_of_birth, user_sex, user_height) VALUES ('SoggyJake', 'soggymuffin@gmail.com', 'benisbiggerthanme123!', '1999-12-19', 'M', 68);