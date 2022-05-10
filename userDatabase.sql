CREATE DATABASE IF NOT EXISTS BBY7_members;
use BBY7_members;


CREATE TABLE IF NOT EXISTS BBY7_user (
  ID int NOT NULL AUTO_INCREMENT,
  firstName varchar(25),
  lastName varchar(25),
  username varchar(25),
  email varchar(25),
  password varchar(25),
  city varchar(25),
  birthDate DATE,
  admin BOOLEAN,
  PRIMARY KEY (ID)
  );


-- CREATE TABLE IF NOT EXISTS BBY7_plant (
--   plantName varchar(50) NOT NULL,
--   plantType varchar(25),
--   soilType varchar(25),
--   region varchar(25),
--   period int,
--   PRIMARY KEY (plantName),
--   FOREIGN KEY (region) REFERENCES BB7_user(city)
-- );

-- CREATE TABLE IF NOT EXISTS BB7_toolList (
--   pName varchar(50) NOT NULL,
--   tool varchar(25),
--   PRIMARY KEY (pName),
--   FOREIGN KEY (pName) REFERENCES BB7_plant(plantName)
-- );


INSERT INTO BBY7_user 
VALUES ("1", "Nacho", "Varga", "nvarga", "nachov@bcs.com", "pass0987", "North Delta", "1981-03-25", TRUE),
  ("2", "Saul", "Goodman", "sgoodman", "saulg@bcs.com", "pass1234", "Saskatoon", "1963-07-14", TRUE),
  ("3", "Dexter", "Morgan", "dmorgan", "dexterm@mpd.com", "pass0987", "Burnaby", "1974-04-22", FALSE),
  ("4", "Rita", "Bennett", "rbennett", "ritab@gmail.com", "pass1234", "Vancouver", "1975-03-16", FALSE),
  ("5", "Naomi", "Nagata", "nnagata", "naomin@bl.com", "pass0987", "Calgary", "1990-10-23", FALSE),
  ("6", "Alex", "Kamal", "akamal", "alexk@mcrn.com", "pass1234", "Edmonton", "1963-07-14", FALSE),
  ("7", "Amos", "Burton", "aburton", "amosb@ba.com", "pass0987", "Toronto", "1988-06-07", FALSE),
  ("8", "Camina", "Drummer", "cdrummer", "caminad@bl.com", "pass1234", "Ottawa", "1985-11-18", FALSE),
  ("9", "Harry", "Bosch", "hbosch", "harryb@lapd.com", "pass0987", "Winnipeg", "1967-03-09", FALSE),
  ("10", "Jerry", "Edgar", "jedgar", "jerrye@lapd.com", "pass1234", "Red Deer", "1985-09-13", FALSE);