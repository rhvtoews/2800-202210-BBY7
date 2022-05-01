CREATE DATABASE IF NOT EXISTS members;
use members;
CREATE TABLE IF NOT EXISTS user (
  ID int NOT NULL AUTO_INCREMENT,
  name varchar(50),
  email varchar(25),
  password varchar(25),
  city varchar(25),
  birthDate DATE,
  PRIMARY KEY (ID)
  );

