CREATE DATABASE IF NOT EXISTS BBY7_members;
use BBY7_members;


CREATE TABLE IF NOT EXISTS BBY7_user (
  ID int NOT NULL AUTO_INCREMENT,
  fullname varchar(50),
  email varchar(25),
  password varchar(25),
  region varchar(25),
  plantCounter int,
  admin BOOLEAN,
  image varchar(50),
  PRIMARY KEY (ID)
  );

  CREATE TABLE IF NOT EXISTS BBY7_plant (
  plantName varchar(50) NOT NULL,
  plantDescription varchar(300) NOT NULL,
  soilType varchar(50),
  bloomingPeriod varchar(25),
  region varchar(25),
  image varchar(50),
  PRIMARY KEY (plantName)
);

CREATE TABLE IF NOT EXISTS BBY7_toolList (
  pName varchar(50) NOT NULL,
  tool varchar(25),
  PRIMARY KEY (pName),
  FOREIGN KEY (pName) REFERENCES BBY7_plant(plantName)
);

CREATE TABLE IF NOT EXISTS BBY7_myplantlist (
  pName varchar(50) NOT NULL,
  email varchar(25) NOT NULL,
  cardTime DATE NOT NULL
);

INSERT INTO BBY7_user 
VALUES ("1", "Nacho Varga", "nachov@bcs.com", "pass0987", "North America", 0, TRUE, "/nacho.webp"),
  ("2", "Saul Goodman", "saulg@bcs.com", "pass1234", "North America", 3, TRUE, "/saul.jpg"),
  ("3", "Dexter Morgan", "dexterm@mpd.com", "pass0987", "North America", 0, FALSE, "/dexter.jpg"),
  ("4", "Rita Bennett", "ritab@gmail.com", "pass1234", "North America", 0, FALSE, "/rita.webp"),
  ("5", "Naomi Nagata", "naomin@bl.com", "pass0987","North America", 0, FALSE, "/naomi.webp");
  

INSERT INTO BBY7_plant 
VALUES ("African Daisy", "These flowers are best planted in the spring after the threat of frost has passed, and they have a fairly quick growth rate, blooming about two months after sprouting from seeds.", "moist, well-drained", "Spring, summer, fall", "Africa, South Asia", "/AfricanDaisy.jpg"),
("Aronia berry", "Black chokeberry (Aronia melanocarpa) is a deciduous shrub that is native to the eastern part of North America.", "Well-drained", "Spring", "North America", "/AroniaBerry.jpg"),
("Bahia Grass", "Bahiagrass grows in stolons, or thick stems that root in short intervals. This means it is perfect for creating thick, blanketing lawns", "Sandy", "Summer to early fall", "South America", "/BahiaGrass.jpg"),
("Beetroot", "The beet plant (Beta vulgaris) is a fast-growing vegetable that can be grown just about anywhere.", "moist, well-drained", "Seasonal", "Europe", "/Beetroot.jpg"),
("Cassia", "The popcorn plant is a tall shrub, and in its native African habitat it can grow up to 25 feet in height", "well-drained", "Summer", "Africa", "/Cassia.webp"),
("Cantaloupe", "It has a tan-green rind and sweet orange flesh. Coarse, medium green heart-shape leaves sit upright on fuzzy stems that line prickly, sprawling vines", "Sandy, well-drained", "Summer", "Asia, Africa", "/Cantaloupe.jpg"),
("Easter Lily", "This perennial bulb bears large, fragrant white or pink flowers. The plant's thick, rigid stem grows upright and is covered in long, thin, dark green leaves.", "Well-drained", "Summer", "Asia", "/EasterLily.jpg"),
("Eureka Lemon Trees", "Eureka lemons were developed from a seedling planted in Los Angeles, California in 1858. The tree is non-vigorous and has a spreading, open growth habit", "Sandy", "spring", "North America", "/EurekaLemonTrees.jpg"),
("Four O'clock Plant", "Four o'clock plants (Mirabilis jalapa) are bushy blooming perennials. These tuberous-rooted plants produce slightly pointed oval leaves on branching stems.", "Moist, well-drained", "Summer, Fall", "South America", "/FourOclockPlant.webp"),
("Gerbera Daisy", "Gerbera daisies are so vividly colored that they can sometimes make you wonder if they're real. Native to South Africa, the Gerbera flower is in the Aster family, alongside sunflowers (Asteraceae)", "Moist, well-drained", "Summer, Fall", "Africa", "/GerberaDaisy.jpg"),
("Ground Cherry", "Ground cherries (Physalis pruinosa) are not very well known, but they are easy to grow in the garden with minimal pest and disease problems", "Sandy, well-drained", "Summer", "North America", "/GroundCherry.jpg"),
("Harebells", "The humble, delicate harebell (Campanula rotundifolia) tolerates sandy, poor soil conditions that would cause many other flower varieties to wither", "Sandy, well-drained", "Summer to fall", "North America", "/Harebells.jpg"),
("Impatiens", "Impatiens plants are one of the most popular annual flowers, due to their brightly colored profuse blooms and their ability to grow in shady areas", "Well-drained", "Spring, Summer ", "Africa", "/Impatiens.jpg"),
("Ivy Geranium", "The common name ivy geranium (or ivy-leafed geranium) is given to various cultivars and hybrids derived from Pelargonium peltatum, one of several species that are commonly referred to as annual or garde geraniums.", "Moist, well-drained", "Spring, Summer, fall", "Africa", "/IvyGeranium.jpg"),
("Incrediball Hydrangea", "The Incrediball hydrangea (Hydrangea arborescens 'Abetwo' Incrediball) is a broadleaf, deciduous flowering shrub.", "Moist, well-drained", "Summer", "Any Continent", "/IncrediballHydrangea.jpg"),
("Indian Hawthorn", "Indian hawthorn (Rhaphiolepis indica) is a relatively small shrub that naturally grows in a neat, rounded shape. Despite its common name, it doesn't solely grow in India. It comes from China and also grows in other parts of Asia.", "Moist, well-drained", "Spring", "Asia", "/IndianHawthorn.jpg"),
("Jacaranda Tree", "The jacaranda tree (Jacaranda mimosifolia) is a beautiful tropical tree that produces clusters of fragrant purple panicle-shaped blooms", "Sandy, well-drained", "Spring, Summer", "South America", "/JacarandaTree.jpg"),
("Jackfruit", "It has a relatively fast growth rate, and new trees can start producing fruit within a few years", "Moist, well-drained", "Seasonal", "Asia", "/Jackfruit.jpg"),
("Julia Child Roses", "The Julia Child rose is known for its luscious blooms and licorice-like scent. It is a smaller rose variety and is often grown in containers.", "Sandy, moist, well-drained", "Spring, Summer, fall", "North America", "/JuliaChildRoses.jpg"),
("Kobus Magnolia", "The Kobus magnolia (Magnolia kobus) is a lovely deciduous small tree for landscapes. It has large dark-green leaves that are obovate in shape and 3 to 8 inches long.", "Well-drained", "Early spring", "Asia", "/KobusMagnolia.jpg"),
("Kale", "Kale plants can be quite ornamental, with textured and curly leaves that come in shades of green, purple, and other colors", "Moist, well-drained", "Spring", "Europe", "/Kale.jpg"),
("Kentucky Coffee Tree", "It has enormous leaves (up to 2 feet wide) making a dramatic impact in the landscape once it reaches its full mature height.", "Moist", "Late Spring  ", "North America", "/KentuckyCoffeeTree.jpg"),
("Lavender", "Lavender (Lavendula spp.) is a well-known and fragrant perennial plant with gray-green foliage, upright flower spikes, and a compact shrub form.", "Well-drained", "Summer", "Europe", "/Lavender.jpg"),
("Magnolia 'Jane'", "The flowers Jane magnolia are fairly large, especially relative to the overall size of the plant. Under ideal conditions, the blooms can reach 8 inches across when fully open.", "Sandy", "Spring", "South America", "/MagnoliaJane.webp"),
("Naked Ladies", "One of the plant's common names???naked ladies???comes from the fact that no foliage accompanies its blooms. This plant has a moderate growth rate.", "Well-drained", "Fall", "Europe, Africa, Asia", "/NakedLadies.jpg");

INSERT INTO BBY7_myplantlist
VALUES ("Cassia", "saulg@bcs.com", "2022-02-09"),
("Impatiens", "saulg@bcs.com", "2022-03-22"),
("Jackfruit", "saulg@bcs.com", "2022-04-11");