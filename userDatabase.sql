CREATE DATABASE IF NOT EXISTS BBY7_members;
use BBY7_members;


CREATE TABLE IF NOT EXISTS BBY7_user (
  ID int NOT NULL AUTO_INCREMENT,
  fullname varchar(50),
  email varchar(25),
  password varchar(25),
  city varchar(25),
  admin BOOLEAN,
  PRIMARY KEY (ID)
  );

  CREATE TABLE IF NOT EXISTS BBY7_plant (
  plantName varchar(50) NOT NULL,
  plantType varchar(25),
  soilType varchar(25),
  region varchar(25),
  period int,
  PRIMARY KEY (plantName),
);

CREATE TABLE IF NOT EXISTS BB7_toolList (
  pName varchar(50) NOT NULL,
  tool varchar(25),
  PRIMARY KEY (pName),
  FOREIGN KEY (pName) REFERENCES BB7_plant(plantName)
);

INSERT INTO BBY7_user 
VALUES ("1", "Nacho Varga", "nachov@bcs.com", "pass0987", "North Delta", TRUE),
  ("2", "Saul Goodman", "saulg@bcs.com", "pass1234", "Saskatoon", TRUE),
  ("3", "Dexter Morgan", "dexterm@mpd.com", "pass0987", "Burnaby", FALSE),
  ("4", "Rita Bennett", "ritab@gmail.com", "pass1234", "Vancouver", FALSE),
  ("5", "Naomi Nagata", "naomin@bl.com", "pass0987", "Calgary", FALSE),
  ("6", "Alex Kamal", "alexk@mcrn.com", "pass1234", "Edmonton", FALSE),
  ("7", "Amos Burton", "amosb@ba.com", "pass0987", "Toronto", FALSE),
  ("8", "Camina Drummer", "caminad@bl.com", "pass1234", "Ottawa", FALSE),
  ("9", "Harry Bosch", "harryb@lapd.com", "pass0987", "Winnipeg", FALSE),
  ("10", "Jerry Edgar", "jerrye@lapd.com", "pass1234", "Red Deer", FALSE);