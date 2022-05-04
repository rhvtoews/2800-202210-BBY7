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


CREATE TABLE IF NOT EXISTS plant (
  plantName varchar(50) NOT NULL,
  plantType varchar(25),
  soilType varchar(25),
  region varchar(25),
  tools varchar(25),
  period int,
  PRIMARY KEY (plantName)
);


INSERT INTO user 
VALUES ("1", "Nacho", "Varga", "nachov@bcs.com", "pass0987", "North Delta", "1981-03-25"),
  ("2", "Saul", "Goodman", "saulg@bcs.com", "pass1234", "Saskatoon", "1963-07-14"),
  ("3", "Dexter", "Morgan", "dexterm@mpd.com", "pass0987", "Burnaby", "1974-04-22"),
  ("4", "Rita", "Bennett", "ritab@gmail.com", "pass1234", "Vancouver", "1975-03-16"),
  ("5", "Naomi", "Nagata", "naomin@bl.com", "pass0987", "Calgary", "1990-10-23"),
  ("6", "Alex", "Kamal", "alexk@mcrn.com", "pass1234", "Edmonton", "1963-07-14"),
  ("7", "Amos", "Burton", "amosb@ba.com", "pass0987", "Toronto", "1988-06-07"),
  ("8", "Camina", "Drummer", "caminad@bl.com", "pass1234", "Ottawa", "1985-11-18"),
  ("9", "Harry", "Bosch", "harryb@lapd.com", "pass0987", "Winnipeg", "1967-03-09"),
  ("10", "Jerry", "Edgar", "jerrye@lapd.com", "pass1234", "Red Deer", "1985-09-13");