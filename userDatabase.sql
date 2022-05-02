CREATE DATABASE IF NOT EXISTS members;
use members;
CREATE TABLE IF NOT EXISTS user (
  ID int NOT NULL AUTO_INCREMENT,
  firstName varchar(25),
  lastName varchar(25),
  email varchar(25),
  password varchar(25),
  city varchar(25),
  birthDate DATE,
  PRIMARY KEY (ID)
  );

INSERT INTO user 
VALUES ("1", "Nacho", "Varga", "nachov@bcs.com", "pass0987", "North Delta", "1981-03-25"),
  ("2", "Saul", "Goodman", "saulg@bcs.com", "pass0987", "North Delta", "1963-07-14")
