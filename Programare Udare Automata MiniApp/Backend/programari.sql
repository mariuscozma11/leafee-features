CREATE DATABASE leafee;

CREATE TABLE programari(
    programari_id SERIAL PRIMARY KEY,
    date VARCHAR(10),
    hour INT,
    minute INT,
    duration INT
);