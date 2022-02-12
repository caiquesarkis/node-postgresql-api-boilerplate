CREATE DATABASE quizrat;

CREATE TABLE quizes(
    quiz_id SERIAL PRIMARY KEY,
    question VARCHAR(255),
    alternatives VARCHAR(255)[],
    answer_id SMALLINT
);