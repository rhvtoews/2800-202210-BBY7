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
  admin BOOLEAN,
  PRIMARY KEY (ID)
  );


-- CREATE TABLE IF NOT EXISTS plant (
--   plantName varchar(50) NOT NULL,
--   plantType varchar(25),
--   soilType varchar(25),
--   region varchar(25),
--   period int,
--   PRIMARY KEY (plantName),
--   FOREIGN KEY (region) REFERENCES user(city)
-- );

-- CREATE TABLE IF NOT EXISTS toolList (
--   pName varchar(50) NOT NULL,
--   tool varchar(25),
--   PRIMARY KEY (pName),
--   FOREIGN KEY (pName) REFERENCES plant(plantName)
-- );


INSERT INTO user 
VALUES ("1", "Nacho", "Varga", "nachov@bcs.com", "pass0987", "North Delta", "1981-03-25", TRUE),
  ("2", "Saul", "Goodman", "saulg@bcs.com", "pass1234", "Saskatoon", "1963-07-14", TRUE),
  ("3", "Dexter", "Morgan", "dexterm@mpd.com", "pass0987", "Burnaby", "1974-04-22", FALSE),
  ("4", "Rita", "Bennett", "ritab@gmail.com", "pass1234", "Vancouver", "1975-03-16", FALSE),
  ("5", "Naomi", "Nagata", "naomin@bl.com", "pass0987", "Calgary", "1990-10-23", FALSE),
  ("6", "Alex", "Kamal", "alexk@mcrn.com", "pass1234", "Edmonton", "1963-07-14", FALSE),
  ("7", "Amos", "Burton", "amosb@ba.com", "pass0987", "Toronto", "1988-06-07", FALSE),
  ("8", "Camina", "Drummer", "caminad@bl.com", "pass1234", "Ottawa", "1985-11-18", FALSE),
  ("9", "Harry", "Bosch", "harryb@lapd.com", "pass0987", "Winnipeg", "1967-03-09", FALSE),
  ("10", "Jerry", "Edgar", "jerrye@lapd.com", "pass1234", "Red Deer", "1985-09-13", FALSE);